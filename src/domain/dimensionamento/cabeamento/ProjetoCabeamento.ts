import type { DomainError } from '../../shared/DomainError';
import {
  Comprimento,
  FatorPotencia,
  Potencia,
  QuantidadeCircuitos,
  Temperatura,
  Tensao,
  type TipoPotencia,
} from '../../shared/grandezas';
import { err, ok, type Result } from '../../shared/Result';
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

export type CampoNumericoCabeamento =
  | 'temperaturaAmbiente'
  | 'tensao'
  | 'potencia'
  | 'fatorPotencia'
  | 'circuitosAgrupados'
  | 'comprimento';

/** Every invalid field at once, so a form can show all messages together. */
export type ErrosProjetoCabeamento = Partial<
  Record<CampoNumericoCabeamento, DomainError>
>;

export function criarProjetoCabeamento(
  dados: DadosProjetoCabeamento,
): Result<ProjetoCabeamento, ErrosProjetoCabeamento> {
  const temperaturaAmbiente = Temperatura.create(dados.temperaturaAmbiente);
  const tensao = Tensao.create(dados.tensao);
  const potencia = Potencia.create(dados.potencia, dados.tipoPotencia);
  const fatorPotencia =
    dados.tipoPotencia === 'ATIVA'
      ? FatorPotencia.create(dados.fatorPotencia)
      : undefined;
  const circuitosAgrupados = QuantidadeCircuitos.create(
    dados.circuitosAgrupados,
  );
  const comprimento = Comprimento.create(dados.comprimento);

  const erros: ErrosProjetoCabeamento = {};
  if (!temperaturaAmbiente.ok)
    erros.temperaturaAmbiente = temperaturaAmbiente.error;
  if (!tensao.ok) erros.tensao = tensao.error;
  if (!potencia.ok) erros.potencia = potencia.error;
  if (fatorPotencia && !fatorPotencia.ok)
    erros.fatorPotencia = fatorPotencia.error;
  if (!circuitosAgrupados.ok)
    erros.circuitosAgrupados = circuitosAgrupados.error;
  if (!comprimento.ok) erros.comprimento = comprimento.error;

  if (
    !temperaturaAmbiente.ok ||
    !tensao.ok ||
    !potencia.ok ||
    (fatorPotencia && !fatorPotencia.ok) ||
    !circuitosAgrupados.ok ||
    !comprimento.ok
  ) {
    return err(erros);
  }

  const carga: Carga = fatorPotencia
    ? {
        tipo: 'ATIVA',
        potencia: potencia.value,
        fatorPotencia: fatorPotencia.value,
      }
    : { tipo: 'APARENTE', potencia: potencia.value };

  return ok({
    finalidade: dados.finalidade,
    utilizacao: dados.utilizacao,
    temperaturaAmbiente: temperaturaAmbiente.value,
    fases: dados.fases,
    tensao: tensao.value,
    carga,
    metodoInstalacao: dados.metodoInstalacao,
    tipoCabo: dados.tipoCabo,
    circuitosAgrupados: circuitosAgrupados.value,
    comprimento: comprimento.value,
  });
}
