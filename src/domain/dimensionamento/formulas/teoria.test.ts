import { decimalLatex, formulasTeoria as f } from './teoria';

describe('formulasTeoria', () => {
  it('divides active power by the power factor', () => {
    expect(f.potenciaAparente()).toBe(
      'P_{\\text{aparente}} = \\frac{P_{\\text{ativa}}}{FP}',
    );
  });

  it('adds √3 to the circuit current only for three-phase circuits', () => {
    expect(f.correnteCircuito('TRIFASICO')).toBe(
      'I_{\\text{circuito}} = \\frac{P_{\\text{aparente}}}{\\sqrt{3} \\cdot V}',
    );
    expect(f.correnteCircuito('MONOFASICO')).toBe(
      'I_{\\text{circuito}} = \\frac{P_{\\text{aparente}}}{V}',
    );
    expect(f.correnteCircuito('BIFASICO')).toBe(
      f.correnteCircuito('MONOFASICO'),
    );
  });

  it('builds the grouping factor and design current', () => {
    expect(f.fatorAgrupamento()).toBe(
      'FA = \\frac{1}{\\sqrt{Q_{\\text{circuitos}}}}',
    );
    expect(f.correnteProjeto()).toBe(
      'I_{\\text{projeto}} = \\frac{I_{\\text{circuito}}}{FA \\cdot FT}',
    );
  });

  it('shows the resistivity of each material with its unit', () => {
    expect(f.resistividade('COBRE')).toBe(
      '\\rho = 0{,}0172 \\, \\Omega \\cdot \\text{mm}^2/\\text{m}',
    );
    expect(f.resistividade('ALUMINIO')).toBe(
      '\\rho = 0{,}02857 \\, \\Omega \\cdot \\text{mm}^2/\\text{m}',
    );
  });

  it('shows the voltage drop limit of each circuit purpose', () => {
    expect(f.quedaTensao('DISTRIBUICAO')).toBe('\\Delta V_{\\text{c}} = 2 \\%');
    expect(f.quedaTensao('TERMINAL')).toBe('\\Delta V_{\\text{c}} = 4 \\%');
  });

  it('uses 100·√3 for three-phase and 200 otherwise in the section formula', () => {
    expect(f.secaoCondutor('TRIFASICO')).toBe(
      'S_{\\text{c}} = \\frac{100 \\cdot \\sqrt{3} \\cdot \\rho \\cdot l_{\\text{cabo}} \\cdot I_{\\text{projeto}}}{\\Delta V_{\\text{c}} \\cdot V}',
    );
    expect(f.secaoCondutor('MONOFASICO')).toBe(
      'S_{\\text{c}} = \\frac{200 \\cdot \\rho \\cdot l_{\\text{cabo}} \\cdot I_{\\text{projeto}}}{\\Delta V_{\\text{c}} \\cdot V}',
    );
  });

  it('builds the breaker coordination and conduit formulas', () => {
    expect(f.coordenacaoDisjuntor()).toBe(
      'I_{\\text{projeto}} \\leq I_{\\text{nominal}} \\leq I_{\\text{máx}}',
    );
    expect(f.diametroCondutor()).toBe(
      'd_{\\text{condutor}} = \\sqrt{\\frac{4 \\cdot S_{\\text{nominal}}}{\\pi}}',
    );
    expect(f.diametroEletroduto()).toBe(
      'd_{\\text{eletroduto}} \\geq \\frac{100 \\cdot d_{\\text{condutor}} \\cdot Q_{\\text{condutores}}}{40}',
    );
  });

  it('writes decimals with a pt-BR comma', () => {
    expect(decimalLatex(2.5)).toBe('2{,}5');
    expect(decimalLatex(40)).toBe('40');
  });
});
