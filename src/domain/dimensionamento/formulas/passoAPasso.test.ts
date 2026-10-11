import type { MemoriaCondutor } from '../memoria';
import { RESULTADO_CABEAMENTO_EXEMPLO } from '../resultadosExemplo';
import { fixoLatex, passoAPasso as p } from './passoAPasso';

const { condutor, disjuntor, eletroduto } =
  RESULTADO_CABEAMENTO_EXEMPLO.memoria;

const ativaTrifasico: MemoriaCondutor = {
  ...condutor,
  dados: {
    ...condutor.dados,
    fases: 'TRIFASICO',
    tensaoV: 220,
    carga: { tipo: 'ATIVA', potenciaW: 1800, fatorPotencia: 0.92 },
  },
  potenciaAparenteVA: 1956.52,
};

describe('passoAPasso', () => {
  it('formats results with two pt-BR decimals', () => {
    expect(fixoLatex(17.3228)).toBe('17{,}32');
    expect(fixoLatex(1)).toBe('1{,}00');
  });

  it('lists the informed data', () => {
    expect(p.dadosInformados(condutor)).toEqual([
      'l_{\\text{cabo}} = 15 \\, \\text{m}',
      'P_{\\text{aparente}} = 2200 \\, \\text{VA}',
      'Q_{\\text{circuitos}} = 1',
      'T_{\\text{ambiente}} = 30 \\, ^\\circ\\text{C}',
      'V = 127 \\, \\text{V}',
    ]);
    expect(p.dadosInformados(ativaTrifasico).slice(1, 3)).toEqual([
      'P_{\\text{ativa}} = 1800 \\, \\text{W}',
      'FP = 0{,}92',
    ]);
  });

  it('shows the apparent power directly when it was informed', () => {
    expect(p.potenciaAparente(condutor)).toEqual([
      'P_{\\text{aparente}} = 2200{,}00 \\, \\text{VA}',
    ]);
  });

  it('derives the apparent power from active power and power factor', () => {
    expect(p.potenciaAparente(ativaTrifasico)).toEqual([
      'P_{\\text{aparente}} = \\frac{P_{\\text{ativa}}}{FP}',
      'P_{\\text{aparente}} = \\frac{1800}{0{,}92}',
      'P_{\\text{aparente}} = 1956{,}52 \\, \\text{VA}',
    ]);
  });

  it('computes the circuit current with √3 only for three-phase', () => {
    expect(p.correnteCircuito(condutor)).toEqual([
      'I_{\\text{circuito}} = \\frac{P_{\\text{aparente}}}{V}',
      'I_{\\text{circuito}} = \\frac{2200{,}00}{127}',
      'I_{\\text{circuito}} = 17{,}32 \\, \\text{A}',
    ]);
    expect(p.correnteCircuito(ativaTrifasico)[1]).toBe(
      'I_{\\text{circuito}} = \\frac{1956{,}52}{\\sqrt{3} \\cdot 220}',
    );
  });

  it('shows grouping, temperature and design current', () => {
    expect(p.fatorAgrupamento(condutor)).toEqual([
      'FA = \\frac{1}{\\sqrt{Q_{\\text{circuitos}}}}',
      'FA = \\frac{1}{\\sqrt{1}}',
      'FA = 1{,}00',
    ]);
    expect(p.fatorTemperatura(condutor)).toEqual(['FT = 1{,}00']);
    expect(p.correnteProjeto(condutor)).toEqual([
      'I_{\\text{projeto}} = \\frac{I_{\\text{circuito}}}{FA \\cdot FT}',
      'I_{\\text{projeto}} = \\frac{17{,}32}{1{,}00 \\cdot 1{,}00}',
      'I_{\\text{projeto}} = 17{,}32 \\, \\text{A}',
    ]);
  });

  it('derives resistivity and voltage drop from the cable and circuit purpose', () => {
    expect(p.resistividade(condutor)).toEqual([
      '\\rho = 0{,}0172 \\, \\Omega \\cdot \\text{mm}^2/\\text{m}',
    ]);
    expect(p.quedaTensao(condutor)).toEqual(['\\Delta V_{\\text{c}} = 4 \\%']);
  });

  it('computes the section, then adopts the NBR minimum', () => {
    expect(p.secaoCondutor(condutor)).toEqual([
      'S_{\\text{c}} = \\frac{200 \\cdot \\rho \\cdot l_{\\text{cabo}} \\cdot I_{\\text{projeto}}}{\\Delta V_{\\text{c}} \\cdot V}',
      'S_{\\text{c}} = \\frac{200 \\cdot 0{,}0172 \\cdot 15 \\cdot 17{,}32}{4 \\cdot 127}',
      'S_{\\text{c}} = 1{,}76 \\, \\text{mm}^2',
    ]);
    expect(p.secaoCondutor(ativaTrifasico)[1]).toContain(
      '100 \\cdot \\sqrt{3}',
    );
    expect(p.secaoAdotada(condutor)).toBe(
      'S_{\\text{c}} = 2{,}50 \\, \\text{mm}^2',
    );
  });

  it('places the design current and conductor capacity around the breaker', () => {
    expect(p.coordenacaoDisjuntor(disjuntor)).toEqual([
      'I_{\\text{projeto}} \\leq I_{\\text{nominal}} \\leq I_{\\text{máx}}',
      '17{,}32 \\leq I_{\\text{nominal}} \\leq 24{,}00',
    ]);
  });

  it('computes the conductor and minimum conduit diameters', () => {
    expect(p.diametroCondutor(eletroduto)).toEqual([
      'd_{\\text{condutor}} = \\sqrt{\\frac{4 \\cdot S_{\\text{nominal}}}{\\pi}}',
      'd_{\\text{condutor}} = \\sqrt{\\frac{4 \\cdot 2{,}5}{\\pi}}',
      'd_{\\text{condutor}} = 1{,}78 \\, \\text{mm}',
    ]);
    expect(p.diametroEletroduto(eletroduto)).toEqual([
      'd_{\\text{eletroduto}} \\geq \\frac{100 \\cdot d_{\\text{condutor}} \\cdot Q_{\\text{condutores}}}{40}',
      'd_{\\text{eletroduto}} \\geq \\frac{100 \\cdot 1{,}78 \\cdot 3}{40}',
      'd_{\\text{eletroduto}} \\geq 13{,}38 \\, \\text{mm}',
    ]);
  });

  it('lists the breaker and conduit inputs', () => {
    expect(p.dadosDisjuntor(disjuntor)).toEqual([
      'I_{\\text{projeto}} = 17{,}32 \\, \\text{A}',
      'I_{\\text{máx}} = 24{,}00 \\, \\text{A}',
    ]);
    expect(p.dadosEletroduto(eletroduto)).toEqual([
      'S_{\\text{nominal}} = 2{,}5 \\, \\text{mm}^2',
      'Q_{\\text{condutores}} = 3',
    ]);
  });
});
