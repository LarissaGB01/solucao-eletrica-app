import {
  criarProjetoCabeamento,
  type DadosProjetoCabeamento,
  type ProjetoCabeamento,
} from './ProjetoCabeamento';

/** A typical 127 V outlet circuit: handy default for tests and previews. */
export const DADOS_PROJETO_CABEAMENTO_EXEMPLO: DadosProjetoCabeamento = {
  finalidade: 'TERMINAL',
  utilizacao: 'TOMADA',
  temperaturaAmbiente: 30,
  fases: 'MONOFASICO',
  tensao: 127,
  tipoPotencia: 'APARENTE',
  potencia: 2200,
  fatorPotencia: 0,
  metodoInstalacao: 'B1',
  tipoCabo: 'PVC',
  circuitosAgrupados: 1,
  comprimento: 15,
};

export function projetoCabeamentoExemplo(): ProjetoCabeamento {
  const result = criarProjetoCabeamento(DADOS_PROJETO_CABEAMENTO_EXEMPLO);
  if (!result.ok) {
    throw new Error('DADOS_PROJETO_CABEAMENTO_EXEMPLO is invalid');
  }
  return result.value;
}
