import type { ProjetoCabeamento } from '../cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../cabeamento/ResultadoCabeamento';
import type { ProjetoDisjuntor } from '../disjuntor/ProjetoDisjuntor';
import type { ResultadoDisjuntor } from '../disjuntor/ResultadoDisjuntor';
import type { ProjetoEletroduto } from '../eletroduto/ProjetoEletroduto';
import type { ResultadoEletroduto } from '../eletroduto/ResultadoEletroduto';
import type {
  DadosCondutor,
  MemoriaCondutor,
  MemoriaDisjuntor,
  MemoriaEletroduto,
} from '../memoria';
import { secaoAdotadaMm2 } from '../memoria';
import type {
  CondutorSugerido,
  DisjuntorSugerido,
  EletrodutoSugerido,
} from '../sugestoes';
import { err, ok, type Result } from '../../shared/Result';
import {
  CONDUTORES_CARREGADOS,
  ISOLACAO_POR_TIPO_CABO,
  MATERIAL_POR_TIPO_CABO,
  QUEDA_TENSAO_MAXIMA,
  RESISTIVIDADE,
  TAXA_OCUPACAO_ELETRODUTO,
} from './constantes';
import { CONDUCAO_CABOS } from './tabelas/conducaoCabos';
import { DISJUNTORES } from './tabelas/disjuntores';
import { ELETRODUTOS } from './tabelas/eletrodutos';
import { FATOR_TEMPERATURA } from './tabelas/fatorTemperatura';

// Offline port of the original Java backend (LarissaGB01/solucao_eletrica_backend):
// same formulas, tables and lookup rules, but full floating-point precision (the backend
// truncated BigDecimal intermediates to the input's scale; see ADR 0006).

export type ErroDimensionamento =
  | { readonly codigo: 'TEMPERATURA_FORA_DA_TABELA' }
  | { readonly codigo: 'CONDUTOR_NAO_ENCONTRADO' };

/** Smallest of `itens` by `chave`, or undefined. */
const menor = <T>(itens: readonly T[], chave: (item: T) => number) =>
  itens.reduce<T | undefined>(
    (atual, item) =>
      atual === undefined || chave(item) < chave(atual) ? item : atual,
    undefined,
  );

function dadosDoProjeto(p: ProjetoCabeamento): DadosCondutor {
  return {
    finalidade: p.finalidade,
    utilizacao: p.utilizacao,
    temperaturaC: p.temperaturaAmbiente.celsius,
    fases: p.fases,
    tensaoV: p.tensao.volts,
    carga:
      p.carga.tipo === 'APARENTE'
        ? { tipo: 'APARENTE', potenciaVA: p.carga.potencia.valor }
        : {
            tipo: 'ATIVA',
            potenciaW: p.carga.potencia.valor,
            fatorPotencia: p.carga.fatorPotencia.valor,
          },
    metodoInstalacao: p.metodoInstalacao,
    tipoCabo: p.tipoCabo,
    circuitosAgrupados: p.circuitosAgrupados.valor,
    comprimentoM: p.comprimento.metros,
  };
}

/** First table row at or above the ambient temperature (backend: `temperatura >= ? ORDER BY temperatura LIMIT 1`). */
function fatorTemperatura(dados: DadosCondutor): number | undefined {
  const isolacao = ISOLACAO_POR_TIPO_CABO[dados.tipoCabo];
  const linha = menor(
    FATOR_TEMPERATURA.filter(
      ([temperatura, iso]) =>
        iso === isolacao && temperatura >= dados.temperaturaC,
    ),
    ([temperatura]) => temperatura,
  );
  return linha?.[2];
}

export function dimensionarCondutor(
  projeto: ProjetoCabeamento,
): Result<
  { condutor: CondutorSugerido; memoria: MemoriaCondutor },
  ErroDimensionamento
> {
  const dados = dadosDoProjeto(projeto);
  const trifasico = dados.fases === 'TRIFASICO';

  const potenciaAparenteVA =
    dados.carga.tipo === 'APARENTE'
      ? dados.carga.potenciaVA
      : dados.carga.potenciaW / dados.carga.fatorPotencia;
  const correnteCircuitoA =
    potenciaAparenteVA /
    (trifasico ? Math.sqrt(3) * dados.tensaoV : dados.tensaoV);
  const fatorAgrupamento = 1 / Math.sqrt(dados.circuitosAgrupados);
  const ft = fatorTemperatura(dados);
  if (ft === undefined) {
    return err({ codigo: 'TEMPERATURA_FORA_DA_TABELA' });
  }
  const correnteProjetoA = correnteCircuitoA / (ft * fatorAgrupamento);

  const material = MATERIAL_POR_TIPO_CABO[dados.tipoCabo];
  const secaoCalculadaMm2 =
    ((trifasico ? 100 * Math.sqrt(3) : 200) *
      RESISTIVIDADE[material] *
      dados.comprimentoM *
      correnteProjetoA) /
    (QUEDA_TENSAO_MAXIMA[dados.finalidade] * dados.tensaoV);

  const memoria: MemoriaCondutor = {
    dados,
    potenciaAparenteVA,
    correnteCircuitoA,
    fatorAgrupamento,
    fatorTemperatura: ft,
    correnteProjetoA,
    secaoCalculadaMm2,
  };

  const secaoMinima = secaoAdotadaMm2(memoria);
  const isolacao = ISOLACAO_POR_TIPO_CABO[dados.tipoCabo];
  const carregados = CONDUTORES_CARREGADOS[dados.fases];
  const linha = menor(
    CONDUCAO_CABOS.filter(
      ([mat, secao, metodo, cond, corrente, iso]) =>
        mat === material &&
        metodo === dados.metodoInstalacao &&
        cond === carregados &&
        iso === isolacao &&
        corrente >= correnteProjetoA &&
        secao >= secaoMinima,
    ),
    ([, secao]) => secao,
  );
  if (linha === undefined) {
    return err({ codigo: 'CONDUTOR_NAO_ENCONTRADO' });
  }

  return ok({
    condutor: { secaoNominalMm2: linha[1], correnteMaximaA: linha[4] },
    memoria,
  });
}

/** Strictly between design current and conductor capacity, as the backend queried. */
export function selecionarDisjuntor(
  memoria: MemoriaDisjuntor,
): DisjuntorSugerido | null {
  const polos = CONDUTORES_CARREGADOS[memoria.fases];
  const linha = menor(
    DISJUNTORES.filter(
      ([corrente, p]) =>
        p === polos &&
        corrente > memoria.correnteProjetoA &&
        corrente < memoria.correnteMaximaCondutorA,
    ),
    ([corrente]) => corrente,
  );
  return linha ? { nome: linha[2], correnteNominalA: linha[0] } : null;
}

export function calcularEletroduto(
  secaoNominalMm2: number,
  quantidadeCondutores: number,
): { eletroduto: EletrodutoSugerido | null; memoria: MemoriaEletroduto } {
  const diametroCondutorMm = Math.sqrt((4 * secaoNominalMm2) / Math.PI);
  // Linear in the conductor count, as in the backend (ADR 0006 keeps this formula).
  const diametroMinimoEletrodutoMm =
    (diametroCondutorMm * quantidadeCondutores * 100) /
    TAXA_OCUPACAO_ELETRODUTO;
  const linha = menor(
    ELETRODUTOS.filter(([, , externo]) => externo > diametroMinimoEletrodutoMm),
    ([, , , interno]) => interno,
  );
  return {
    eletroduto: linha
      ? { diametroNominalPolegadas: linha[0], diametroNominalMm: linha[1] }
      : null,
    memoria: {
      secaoNominalMm2,
      quantidadeCondutores,
      diametroCondutorMm,
      diametroMinimoEletrodutoMm,
    },
  };
}

export function dimensionarCabeamento(
  projeto: ProjetoCabeamento,
): Result<ResultadoCabeamento, ErroDimensionamento> {
  const condutor = dimensionarCondutor(projeto);
  if (!condutor.ok) {
    return condutor;
  }
  const memoriaDisjuntor: MemoriaDisjuntor = {
    fases: projeto.fases,
    correnteProjetoA: condutor.value.memoria.correnteProjetoA,
    correnteMaximaCondutorA: condutor.value.condutor.correnteMaximaA,
  };
  // The backend used the number of grouped circuits as the conductor count here.
  const eletroduto = calcularEletroduto(
    condutor.value.condutor.secaoNominalMm2,
    projeto.circuitosAgrupados.valor,
  );
  return ok({
    condutor: condutor.value.condutor,
    disjuntor: selecionarDisjuntor(memoriaDisjuntor),
    eletroduto: eletroduto.eletroduto,
    memoria: {
      condutor: condutor.value.memoria,
      disjuntor: memoriaDisjuntor,
      eletroduto: eletroduto.memoria,
    },
  });
}

export function dimensionarDisjuntor(
  projeto: ProjetoDisjuntor,
): ResultadoDisjuntor {
  const memoria: MemoriaDisjuntor = {
    fases: projeto.fases,
    correnteProjetoA: projeto.correnteProjeto.amperes,
    correnteMaximaCondutorA: projeto.correnteMaximaCondutor.amperes,
  };
  return { disjuntor: selecionarDisjuntor(memoria), memoria };
}

export function dimensionarEletroduto(
  projeto: ProjetoEletroduto,
): ResultadoEletroduto {
  return calcularEletroduto(
    projeto.secaoNominalCondutor.mm2,
    projeto.quantidadeCondutores.valor,
  );
}
