import type {
  FinalidadeCircuito,
  MetodoInstalacao,
  TipoCabo,
  UtilizacaoCircuito,
} from './cabeamento/enums';
import type { Fases } from './fases';
import { SECAO_MINIMA } from './nbr5410/constantes';

// Intermediate values of each sizing, shown step by step. Plain data, so results stay
// serializable. The Phase 5 engine fills these; golden tests compare them with the backend.
// Values that are pure constant lookups (resistivity, voltage drop, minimum section) are not
// stored: they are derived from `dados` with nbr5410/constantes.

export type CargaInformada =
  | Readonly<{ tipo: 'APARENTE'; potenciaVA: number }>
  | Readonly<{ tipo: 'ATIVA'; potenciaW: number; fatorPotencia: number }>;

export type DadosCondutor = Readonly<{
  finalidade: FinalidadeCircuito;
  utilizacao: UtilizacaoCircuito;
  temperaturaC: number;
  fases: Fases;
  tensaoV: number;
  carga: CargaInformada;
  metodoInstalacao: MetodoInstalacao;
  tipoCabo: TipoCabo;
  circuitosAgrupados: number;
  comprimentoM: number;
}>;

export type MemoriaCondutor = Readonly<{
  dados: DadosCondutor;
  potenciaAparenteVA: number;
  correnteCircuitoA: number;
  fatorAgrupamento: number;
  fatorTemperatura: number;
  correnteProjetoA: number;
  /** Section from the voltage-drop formula, before applying the minimum. */
  secaoCalculadaMm2: number;
}>;

export type MemoriaDisjuntor = Readonly<{
  fases: Fases;
  correnteProjetoA: number;
  correnteMaximaCondutorA: number;
}>;

export type MemoriaEletroduto = Readonly<{
  secaoNominalMm2: number;
  quantidadeCondutores: number;
  diametroCondutorMm: number;
  diametroMinimoEletrodutoMm: number;
}>;

/** The section actually adopted: the calculated one, or the NBR minimum for the circuit's use. */
export function secaoAdotadaMm2(memoria: MemoriaCondutor): number {
  return Math.max(
    memoria.secaoCalculadaMm2,
    SECAO_MINIMA[memoria.dados.utilizacao],
  );
}

export function minimoAplicado(memoria: MemoriaCondutor): boolean {
  return memoria.secaoCalculadaMm2 < SECAO_MINIMA[memoria.dados.utilizacao];
}
