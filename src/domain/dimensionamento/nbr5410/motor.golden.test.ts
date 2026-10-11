import { criarProjetoCabeamento } from '../cabeamento/ProjetoCabeamento';
import { criarProjetoDisjuntor } from '../disjuntor/ProjetoDisjuntor';
import { criarProjetoEletroduto } from '../eletroduto/ProjetoEletroduto';
import goldenCabeamento from './golden/cabeamento.json';
import goldenDisjuntor from './golden/disjuntor.json';
import goldenEletroduto from './golden/eletroduto.json';
import {
  dimensionarCabeamento,
  dimensionarDisjuntor,
  dimensionarEletroduto,
} from './motor';

// Expected values come from the original Java backend (scripts/golden/gerar-golden.mjs).
// The backend truncated BigDecimal intermediates (e.g. 10.0/π -> 3.2), so continuous values
// match within 0.01 absolute or 1% relative; discrete choices must match exactly.
const proximo = (recebido: number, esperado: number) => {
  const diferenca = Math.abs(recebido - esperado);
  return diferenca <= 0.01 || diferenca <= Math.abs(esperado) * 0.01;
};

const esperarProximo = (recebido: number, esperado: number, campo: string) => {
  if (!proximo(recebido, esperado)) {
    throw new Error(`${campo}: recebido ${recebido}, esperado ${esperado}`);
  }
};

// Backend error codes -> engine error codes.
const ERROS_BACKEND: Record<number, string> = {
  401: 'CONDUTOR_NAO_ENCONTRADO',
  402: 'TEMPERATURA_FORA_DA_TABELA',
};

type EntradaCabeamento = (typeof goldenCabeamento)[number]['entrada'];

const projetoCabeamento = (e: EntradaCabeamento) => {
  const projeto = criarProjetoCabeamento({
    finalidade: e.finalidade as 'TERMINAL' | 'DISTRIBUICAO',
    utilizacao: e.utilizacao as 'TOMADA' | 'ILUMINACAO',
    temperaturaAmbiente: e.temperaturaAmbiente,
    fases: e.fases as 'MONOFASICO' | 'BIFASICO' | 'TRIFASICO',
    tensao: e.tensao,
    tipoPotencia: e.tipoPotencia as 'APARENTE' | 'ATIVA',
    potencia: e.potencia,
    fatorPotencia: e.fatorPotencia,
    metodoInstalacao: e.metodoInstalacao as
      | 'A1'
      | 'A2'
      | 'B1'
      | 'B2'
      | 'C'
      | 'D',
    tipoCabo: e.tipoCabo as 'PVC' | 'EPR' | 'ALUMINIO',
    circuitosAgrupados: e.circuitosAgrupados,
    comprimento: e.comprimento,
  });
  if (!projeto.ok) throw new Error(`entrada inválida: ${JSON.stringify(e)}`);
  return projeto.value;
};

describe('golden: dimensionarCabeamento matches the Java backend', () => {
  it.each(goldenCabeamento.map((caso, i) => [i + 1, caso] as const))(
    'case %i',
    (_, caso) => {
      const resultado = dimensionarCabeamento(projetoCabeamento(caso.entrada));

      if ('erro' in caso && caso.erro !== undefined) {
        expect(resultado).toEqual({
          ok: false,
          error: { codigo: ERROS_BACKEND[caso.erro] },
        });
        return;
      }
      if (!resultado.ok)
        throw new Error(`erro inesperado: ${resultado.error.codigo}`);
      const { saida } = caso;
      const { condutor, disjuntor, eletroduto } = resultado.value.memoria;

      esperarProximo(
        condutor.potenciaAparenteVA,
        saida.potenciaAparenteVA,
        'potenciaAparente',
      );
      esperarProximo(
        condutor.correnteCircuitoA,
        saida.correnteCircuitoA,
        'correnteCircuito',
      );
      esperarProximo(
        condutor.fatorAgrupamento,
        saida.fatorAgrupamento,
        'fatorAgrupamento',
      );
      expect(condutor.fatorTemperatura).toBe(saida.fatorTemperatura);
      esperarProximo(
        condutor.correnteProjetoA,
        saida.correnteProjetoA,
        'correnteProjeto',
      );
      esperarProximo(
        condutor.secaoCalculadaMm2,
        saida.secaoCalculadaMm2,
        'secaoCalculada',
      );
      expect(resultado.value.condutor).toEqual(saida.condutor);
      expect(resultado.value.disjuntor).toEqual(saida.disjuntor);
      expect(disjuntor.correnteMaximaCondutorA).toBe(
        saida.condutor.correnteMaximaA,
      );
      expect(eletroduto.quantidadeCondutores).toBe(saida.quantidadeCondutores);
      // Here the backend rounded 4·S/π to the decimal places of S (2.5 -> 3.2, 10 -> 13)
      // before the square root. Check that this is the only difference.
      const secao = saida.condutor.secaoNominalMm2;
      const casas = String(secao).split('.')[1]?.length ?? 0;
      esperarProximo(
        Math.sqrt(Number(((4 * secao) / Math.PI).toFixed(casas))),
        saida.diametroCondutorMm,
        'diametroCondutor (backend)',
      );
      expect(eletroduto.diametroCondutorMm).toBeCloseTo(
        Math.sqrt((4 * secao) / Math.PI),
        9,
      );
      const escala = eletroduto.diametroCondutorMm / saida.diametroCondutorMm;
      esperarProximo(
        eletroduto.diametroMinimoEletrodutoMm,
        saida.diametroMinimoEletrodutoMm * escala,
        'diametroMinimoEletroduto',
      );
      expect(resultado.value.eletroduto).toEqual(saida.eletroduto);
    },
  );
});

describe('golden: dimensionarDisjuntor matches the Java backend', () => {
  it.each(goldenDisjuntor.map((caso, i) => [i + 1, caso] as const))(
    'case %i',
    (_, caso) => {
      const projeto = criarProjetoDisjuntor({
        fases: caso.entrada.fases as 'MONOFASICO' | 'BIFASICO' | 'TRIFASICO',
        correnteProjeto: caso.entrada.correnteProjeto,
        correnteMaximaCondutor: caso.entrada.correnteMaximaCondutor,
      });

      if ('erro' in caso) {
        // Backend 305: rejected as invalid input before any calculation.
        expect(projeto.ok).toBe(false);
        return;
      }
      if (!projeto.ok) throw new Error('entrada inválida');
      expect(dimensionarDisjuntor(projeto.value).disjuntor).toEqual(
        caso.saida.disjuntor,
      );
    },
  );
});

describe('golden: dimensionarEletroduto matches the Java backend', () => {
  it.each(goldenEletroduto.map((caso, i) => [i + 1, caso] as const))(
    'case %i',
    (_, caso) => {
      const projeto = criarProjetoEletroduto(caso.entrada);
      if (!projeto.ok) throw new Error('entrada inválida');

      const resultado = dimensionarEletroduto(projeto.value);

      esperarProximo(
        resultado.memoria.diametroCondutorMm,
        caso.saida.diametroCondutorMm,
        'diametroCondutor',
      );
      esperarProximo(
        resultado.memoria.diametroMinimoEletrodutoMm,
        caso.saida.diametroMinimoEletrodutoMm,
        'diametroMinimoEletroduto',
      );
      expect(resultado.eletroduto).toEqual(caso.saida.eletroduto);
    },
  );
});
