import { combinarCampos, type ErrosCampos } from '../../shared/combinarCampos';
import {
  Comprimento,
  FatorPotencia,
  Potencia,
  QuantidadeCircuitos,
  Temperatura,
  Tensao,
  type TipoPotencia,
} from '../../shared/grandezas';
import { ok, type Result } from '../../shared/Result';
import type {
  Fases,
  FinalidadeCircuito,
  MetodoInstalacao,
  TipoCabo,
  UtilizacaoCircuito,
} from './enums';

/** Load of the circuit: apparent power alone, or active power with its power factor. */
export type Carga =
  | { readonly tipo: 'APARENTE'; readonly potencia: Potencia }
  | {
      readonly tipo: 'ATIVA';
      readonly potencia: Potencia;
      readonly fatorPotencia: FatorPotencia;
    };

export type ProjetoCabeamento = Readonly<{
  finalidade: FinalidadeCircuito;
  utilizacao: UtilizacaoCircuito;
  temperaturaAmbiente: Temperatura;
  fases: Fases;
  tensao: Tensao;
  carga: Carga;
  metodoInstalacao: MetodoInstalacao;
  tipoCabo: TipoCabo;
  circuitosAgrupados: QuantidadeCircuitos;
  comprimento: Comprimento;
}>;

/** Raw input, already parsed to numbers. `fatorPotencia` is only read when `tipoPotencia` is ATIVA. */
export type DadosProjetoCabeamento = Readonly<{
  finalidade: FinalidadeCircuito;
  utilizacao: UtilizacaoCircuito;
  temperaturaAmbiente: number;
  fases: Fases;
  tensao: number;
  tipoPotencia: TipoPotencia;
  potencia: number;
  fatorPotencia: number;
  metodoInstalacao: MetodoInstalacao;
  tipoCabo: TipoCabo;
  circuitosAgrupados: number;
  comprimento: number;
}>;

export type ErrosProjetoCabeamento = ErrosCampos<
  | 'temperaturaAmbiente'
  | 'tensao'
  | 'potencia'
  | 'fatorPotencia'
  | 'circuitosAgrupados'
  | 'comprimento'
>;

export function criarProjetoCabeamento(
  dados: DadosProjetoCabeamento,
): Result<ProjetoCabeamento, ErrosProjetoCabeamento> {
  const campos = combinarCampos({
    temperaturaAmbiente: Temperatura.create(dados.temperaturaAmbiente),
    tensao: Tensao.create(dados.tensao),
    potencia: Potencia.create(dados.potencia, dados.tipoPotencia),
    fatorPotencia:
      dados.tipoPotencia === 'ATIVA'
        ? FatorPotencia.create(dados.fatorPotencia)
        : ok(undefined),
    circuitosAgrupados: QuantidadeCircuitos.create(dados.circuitosAgrupados),
    comprimento: Comprimento.create(dados.comprimento),
  });
  if (!campos.ok) {
    return campos;
  }

  const { potencia, fatorPotencia, ...grandezas } = campos.value;
  const carga: Carga = fatorPotencia
    ? { tipo: 'ATIVA', potencia, fatorPotencia }
    : { tipo: 'APARENTE', potencia };

  return ok({
    ...grandezas,
    finalidade: dados.finalidade,
    utilizacao: dados.utilizacao,
    fases: dados.fases,
    metodoInstalacao: dados.metodoInstalacao,
    tipoCabo: dados.tipoCabo,
    carga,
  });
}
