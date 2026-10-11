import type { ResultadoCabeamento } from './cabeamento/ResultadoCabeamento';
import type { ResultadoDisjuntor } from './disjuntor/ResultadoDisjuntor';
import type { ResultadoEletroduto } from './eletroduto/ResultadoEletroduto';
import type {
  MemoriaCondutor,
  MemoriaDisjuntor,
  MemoriaEletroduto,
} from './memoria';

// One coherent example: 127 V single-phase outlet circuit, 2200 VA, 15 m, method B1, PVC, 30 °C.
// Intermediate values follow the backend formulas; table lookups follow NBR 5410 and the
// Siemens/Kanaflex catalogues. Used by the mock calculator and by tests.

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

const memoriaEletroduto: MemoriaEletroduto = {
  secaoNominalMm2: 2.5,
  quantidadeCondutores: 3, // phase, neutral, ground
  diametroCondutorMm: 1.78, // √(4 · 2.5 / π)
  diametroMinimoEletrodutoMm: 13.38, // 100 · 1.7841 · 3 / 40 (unrounded diameter)
};

export const RESULTADO_CABEAMENTO_EXEMPLO: ResultadoCabeamento = {
  condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
  disjuntor: { nome: 'Siemens 5SL1 C20', correnteNominalA: 20 },
  eletroduto: { diametroNominalPolegadas: '3/4"', diametroNominalMm: 25 },
  memoria: {
    condutor: memoriaCondutor,
    disjuntor: memoriaDisjuntor,
    eletroduto: memoriaEletroduto,
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
