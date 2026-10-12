import { colors } from '../../theme';
import { KATEX_CSS, KATEX_JS } from './katexAssets.generated';

const FONT_SIZE = 18;

// Prevents "</script>" or "<!--" inside a LaTeX string from breaking out of the script tag.
const toScriptJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c');

/** What each symbol means, listed under the formulas ("Onde: ρ resistividade…"). */
export type FormulaLegend = Readonly<{
  title: string;
  items: readonly Readonly<{ symbol: string; meaning: string }>[];
}>;

/** Self-contained HTML page that renders each expression with KaTeX and reports its height. */
export function buildFormulaHtml(
  expressions: readonly string[],
  legend?: FormulaLegend,
): string {
  return `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>${KATEX_CSS}
html, body { margin: 0; padding: 0; background: transparent; color: ${
    colors.textStrong
  }; }
.formula { margin: 12px 0; font-size: ${FONT_SIZE}px; }
.katex-display { margin: 0; }
.onde { margin: 4px 0 12px; font-family: -apple-system, Roboto, sans-serif; font-size: 14px; line-height: 1.4; color: ${
    colors.textMuted
  }; }
.onde-titulo { font-weight: bold; margin-bottom: 4px; }
.onde-linha { display: flex; align-items: baseline; margin: 4px 0; }
.onde-simbolo { flex: 0 0 auto; min-width: 96px; padding-right: 8px; font-size: 16px; color: ${
    colors.textStrong
  }; }
</style>
</head>
<body>
<div id="root"></div>
<script>${KATEX_JS}</script>
<script>
(function () {
  var root = document.getElementById('root');
  ${toScriptJson(expressions)}.forEach(function (latex) {
    var el = document.createElement('div');
    el.className = 'formula';
    katex.render(latex, el, { displayMode: true, throwOnError: false });
    root.appendChild(el);
  });
  var legend = ${toScriptJson(legend ?? null)};
  if (legend) {
    var onde = document.createElement('div');
    onde.className = 'onde';
    var title = document.createElement('div');
    title.className = 'onde-titulo';
    title.textContent = legend.title;
    onde.appendChild(title);
    legend.items.forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'onde-linha';
      var symbol = document.createElement('span');
      symbol.className = 'onde-simbolo';
      katex.render(item.symbol, symbol, { throwOnError: false });
      var meaning = document.createElement('span');
      meaning.textContent = item.meaning;
      row.appendChild(symbol);
      row.appendChild(meaning);
      onde.appendChild(row);
    });
    root.appendChild(onde);
  }
  // The WebView doesn't scroll, so shrink formulas that are wider than the screen.
  function fitWidth() {
    Array.prototype.forEach.call(document.querySelectorAll('.formula'), function (el) {
      el.style.fontSize = '${FONT_SIZE}px';
      if (el.scrollWidth > el.clientWidth) {
        el.style.fontSize = (${FONT_SIZE} * el.clientWidth) / el.scrollWidth + 'px';
      }
    });
  }
  function reportHeight() {
    fitWidth();
    window.ReactNativeWebView.postMessage(String(document.documentElement.scrollHeight));
  }
  document.fonts.ready.then(reportHeight);
  reportHeight();
})();
</script>
</body>
</html>`;
}
