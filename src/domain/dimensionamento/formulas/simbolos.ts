/** LaTeX symbol for each quantity, shared by the theory and step-by-step formulas. */
export const SIMBOLOS = {
  potenciaAparente: 'P_{\\text{aparente}}',
  potenciaAtiva: 'P_{\\text{ativa}}',
  fatorPotencia: 'FP',
  tensao: 'V',
  correnteCircuito: 'I_{\\text{circuito}}',
  quantidadeCircuitos: 'Q_{\\text{circuitos}}',
  fatorAgrupamento: 'FA',
  fatorTemperatura: 'FT',
  correnteProjeto: 'I_{\\text{projeto}}',
  resistividade: '\\rho',
  comprimento: 'l_{\\text{cabo}}',
  quedaTensao: '\\Delta V_{\\text{c}}',
  secaoCondutor: 'S_{\\text{c}}',
  secaoNominal: 'S_{\\text{nominal}}',
  correnteNominal: 'I_{\\text{nominal}}',
  correnteMaximaCondutor: 'I_{\\text{máx}}',
  diametroCondutor: 'd_{\\text{condutor}}',
  quantidadeCondutores: 'Q_{\\text{condutores}}',
  diametroEletroduto: 'd_{\\text{eletroduto}}',
} as const;

export const UNIDADES = {
  resistividade: '\\Omega \\cdot \\text{mm}^2/\\text{m}',
  secao: '\\text{mm}^2',
} as const;
