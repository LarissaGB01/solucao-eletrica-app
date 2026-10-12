import {
  RESULTADO_CABEAMENTO_EXEMPLO as exemplo,
  RESULTADO_ELETRODUTO_EXEMPLO,
} from '../../../domain/dimensionamento/resultadosExemplo';
import type { Bloco, Secao } from '../conteudo/Bloco';
import { secoesCondutor } from './secoesCondutor';
import { secoesDisjuntor } from './secoesDisjuntor';
import { secoesEletroduto } from './secoesEletroduto';

const textos = (secao: Secao | undefined) =>
  (secao?.blocos ?? []).flatMap((bloco: Bloco) =>
    bloco.tipo === 'texto' ? [bloco.texto] : [],
  );

/** Header as announced by screen readers: "Título = valor". */
const cabecalho = (secao: Secao) =>
  secao.valor === undefined ? secao.titulo : `${secao.titulo} = ${secao.valor}`;

const tabelas = (secoes: readonly Secao[]) =>
  secoes.flatMap(s =>
    s.blocos.flatMap(b => (b.tipo === 'tabela' ? [b.tabela] : [])),
  );
const titulosTabelas = (secoes: readonly Secao[]) =>
  tabelas(secoes).map(t => t.titulo);

describe('secoesCondutor', () => {
  const secoes = secoesCondutor(exemplo.memoria.condutor, exemplo.condutor);

  it('has the old app sections, with the value of each step in its title', () => {
    expect(secoes.map(cabecalho)).toEqual([
      'Dados Informados',
      'Potência Aparente = 2200,00 VA',
      'Corrente do Circuito = 17,32 A',
      'Fator de Agrupamento = 1,00',
      'Fator de Temperatura = 1,00',
      'Corrente de Projeto = 17,32 A',
      'Resistividade do Condutor = 0,0172 Ω·mm²/m',
      'Queda de Tensão = 4 %',
      'Seção Mínima do Condutor = 2,50 mm²',
      'Recomendação de Condutor = 2,50 mm²',
    ]);
  });

  it('explains when the NBR minimum section replaces the calculated one', () => {
    expect(textos(secoes[8])).toEqual([
      'Para um circuito de TOMADA, o mínimo aceito para a seção nominal do condutor é 2,5 mm².',
      'Logo,',
    ]);
    const acimaDoMinimo = secoesCondutor(
      { ...exemplo.memoria.condutor, secaoCalculadaMm2: 3.1 },
      exemplo.condutor,
    );
    expect(textos(acimaDoMinimo[8])).not.toContain('Logo,');
  });

  it('shows the conduction table of the cable insulation', () => {
    expect(titulosTabelas(secoes)).toContain(
      'Capacidade de condução de corrente, isolação PVC (NBR 5410, Tabela 36)',
    );
    const epr = secoesCondutor(
      {
        ...exemplo.memoria.condutor,
        dados: { ...exemplo.memoria.condutor.dados, tipoCabo: 'EPR' },
      },
      exemplo.condutor,
    );
    expect(titulosTabelas(epr)).toContain(
      'Capacidade de condução de corrente, isolação EPR (NBR 5410, Tabela 37)',
    );
  });

  it('highlights the rows used: temperature factor and chosen section', () => {
    const [temperatura, conducao] = tabelas(secoes);
    expect(temperatura?.linhas[temperatura.destaque ?? -1]).toEqual([
      '30',
      '1',
    ]);
    expect(conducao?.linhas[conducao.destaque ?? -1]?.[0]).toBe('2,5');
  });
});

describe('secoesDisjuntor', () => {
  it('shows poles from the loaded conductors and the suggested breaker', () => {
    const secoes = secoesDisjuntor(
      exemplo.memoria.disjuntor,
      exemplo.disjuntor,
    );
    expect(secoes.map(cabecalho)).toEqual([
      'Dados Informados',
      'Corrente Nominal do Disjuntor',
      'Recomendação de Disjuntor = 20,00 A',
    ]);
    expect(textos(secoes[2])).toEqual([
      'Curva C',
      'Bipolar (2P)',
      'Nome: 5SL1 220-7MB',
      'Corrente nominal: 20,00 A',
    ]);
  });

  it('says when no breaker fits', () => {
    const secoes = secoesDisjuntor(exemplo.memoria.disjuntor, null);
    expect(secoes[2] && cabecalho(secoes[2])).toBe('Recomendação de Disjuntor');
    expect(textos(secoes[2])).toContain(
      'Desculpe, mas não encontrei disjuntor para os parâmetros fornecidos.',
    );
  });
});

describe('secoesEletroduto', () => {
  it('shows the diameters and the suggested conduit', () => {
    const secoes = secoesEletroduto(
      RESULTADO_ELETRODUTO_EXEMPLO.memoria,
      RESULTADO_ELETRODUTO_EXEMPLO.eletroduto,
    );
    expect(secoes.map(cabecalho)).toEqual([
      'Dados Informados',
      'Diâmetro do Condutor = 1,78 mm',
      'Diâmetro Mínimo do Eletroduto = 13,38 mm',
      'Recomendação de Eletroduto = 1 1/4"',
    ]);
    expect(textos(secoes[3])).toEqual([
      'Diâmetro nominal externo ≥ 13,38 mm',
      'Diâmetro nominal: 1 1/4" (30,00 mm)',
    ]);
  });

  it('says when no conduit fits', () => {
    const secoes = secoesEletroduto(RESULTADO_ELETRODUTO_EXEMPLO.memoria, null);
    expect(textos(secoes[3])).toContain(
      'Desculpe, mas não encontrei eletroduto para os parâmetros fornecidos.',
    );
  });
});
