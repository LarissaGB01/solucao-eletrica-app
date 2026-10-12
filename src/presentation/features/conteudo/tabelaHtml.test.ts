import { tabelaHtml } from './tabelaHtml';

describe('tabelaHtml', () => {
  const html = tabelaHtml({
    titulo: 'Eletrodutos <Kanalex>',
    colunas: ['Ø (pol)', 'Ø externo (mm)'],
    linhas: [
      ['1 1/4"', '41,3'],
      ['2"', '63,0'],
    ],
    destaque: 1,
    nota: 'Em destaque, a linha usada no cálculo.',
  });

  it('allows pinch zoom', () => {
    expect(html).toContain('maximum-scale=5, user-scalable=yes');
  });

  it('renders headers, cells and the note, escaping HTML', () => {
    expect(html).toContain('<h1>Eletrodutos &lt;Kanalex&gt;</h1>');
    expect(html).toContain('<th>Ø externo (mm)</th>');
    expect(html).toContain('<td>1 1/4&quot;</td>');
    expect(html).toContain('<p>Em destaque, a linha usada no cálculo.</p>');
  });

  it('highlights only the row used', () => {
    expect(html.match(/class="destaque"/g)).toHaveLength(1);
    expect(html).toContain('<tr class="destaque"><td>2&quot;</td>');
  });
});
