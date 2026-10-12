import { buildFormulaHtml } from './formulaHtml';

describe('buildFormulaHtml', () => {
  it('embeds every expression and the KaTeX runtime', () => {
    const html = buildFormulaHtml(['I_b = \\frac{P}{V}', 'S = 220']);
    expect(html).toContain(JSON.stringify(['I_b = \\frac{P}{V}', 'S = 220']));
    expect(html).toContain('katex.render');
    expect(html).toContain('@font-face');
  });

  it('escapes "<" so an expression cannot close the script tag', () => {
    const html = buildFormulaHtml(['</script><script>alert(1)</script>']);
    expect(html).not.toContain('</script><script>alert(1)');
    expect(html).toContain('\\u003c/script>');
  });

  it('lists the meaning of each symbol under the formulas', () => {
    const html = buildFormulaHtml(['\\rho = 0{,}0172'], {
      title: 'Onde:',
      items: [{ symbol: '\\rho', meaning: 'resistividade <do cobre>' }],
    });
    expect(html).toContain('"title":"Onde:"');
    expect(html).toContain('\\u003cdo cobre>');
    expect(html).toContain('meaning.textContent = item.meaning');
    expect(buildFormulaHtml(['x'])).toContain('var legend = null;');
  });

  it('does not reference any external resource', () => {
    expect(buildFormulaHtml(['x'])).not.toMatch(/(src|href)=["']?https?:/);
  });
});
