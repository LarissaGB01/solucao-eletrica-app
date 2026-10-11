import type { ResultadoCabeamento } from './cabeamento/ResultadoCabeamento';
import type { ResultadoDisjuntor } from './disjuntor/ResultadoDisjuntor';
import type { ResultadoEletroduto } from './eletroduto/ResultadoEletroduto';
import type {
  MemoriaCondutor,
  MemoriaDisjuntor,
  MemoriaEletroduto,
} from './memoria';

// One coherent example: 127 V single-phase outlet circuit, 2200 VA, 15 m, method B1, PVC, 30 °C.
// Values are the offline engine's output for `projetoCabeamentoExemplo`, rounded to two
// decimals (a test keeps them in sync). Used by tests and previews.

const memoriaCondutor: MemoriaCondutor = {
  dados: {
    finalidade: 'TERMINAL',
    utilizacao: 'TOMADA',
    temperaturaC: 30,
    fases: 'MONOFASICO',
    tensaoV: 127,
    carga: { tipo: 'APARENTE', potenciaVA: 2200 },
    metodoInstalacao: 'B1',
    tipoCabo: 'PVC',
    circuitosAgrupados: 1,
    comprimentoM: 15,
  },
  potenciaAparenteVA: 2200,
  correnteCircuitoA: 17.32, // 2200 / 127
  fatorAgrupamento: 1, // 1 / √1
  fatorTemperatura: 1, // PVC at 30 °C
  correnteProjetoA: 17.32, // 17.32 / (1 · 1)
  secaoCalculadaMm2: 1.76, // 200 · 0.0172 · 15 · 17.32 / (4 · 127), below the 2.5 mm² minimum
};

const memoriaDisjuntor: MemoriaDisjuntor = {
  fases: 'MONOFASICO',
  correnteProjetoA: 17.32,
  correnteMaximaCondutorA: 24,
};

// In the combined flow the conductor count is the number of grouped circuits (backend parity).
const memoriaEletrodutoCabeamento: MemoriaEletroduto = {
  secaoNominalMm2: 2.5,
  quantidadeCondutores: 1,
  diametroCondutorMm: 1.78, // √(4 · 2.5 / π)
  diametroMinimoEletrodutoMm: 4.46, // 100 · 1.7841 · 1 / 40 (unrounded diameter)
};

/** Conduit-only flow: three 2.5 mm² conductors (phase, neutral, ground). */
const memoriaEletroduto: MemoriaEletroduto = {
  ...memoriaEletrodutoCabeamento,
  quantidadeCondutores: 3,
  diametroMinimoEletrodutoMm: 13.38,
};

export const RESULTADO_CABEAMENTO_EXEMPLO: ResultadoCabeamento = {
  condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
  disjuntor: { nome: '5SL1 220-7MB', correnteNominalA: 20 },
  eletroduto: { diametroNominalPolegadas: '1.1/4"', diametroNominalMm: 30 },
  memoria: {
    condutor: memoriaCondutor,
    disjuntor: memoriaDisjuntor,
    eletroduto: memoriaEletrodutoCabeamento,
  },
};

export const RESULTADO_DISJUNTOR_EXEMPLO: ResultadoDisjuntor = {
  disjuntor: RESULTADO_CABEAMENTO_EXEMPLO.disjuntor,
  memoria: memoriaDisjuntor,
};

export const RESULTADO_ELETRODUTO_EXEMPLO: ResultadoEletroduto = {
  eletroduto: RESULTADO_CABEAMENTO_EXEMPLO.eletroduto,
  memoria: memoriaEletroduto,
};
