import { colors } from '../../theme';
import { KATEX_CSS, KATEX_JS } from './katexAssets.generated';

const FONT_SIZE = 18;

// Prevents "</script>" or "<!--" inside a LaTeX string from breaking out of the script tag.
const toScriptJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c');

/** Self-contained HTML page that renders each expression with KaTeX and reports its height. */
export function buildFormulaHtml(expressions: readonly string[]): string {
  return `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>${KATEX_CSS}
html, body { margin: 0; padding: 0; background: transparent; color: ${
    colors.textStrong
  }; }
.formula { margin: 8px 0; font-size: ${FONT_SIZE}px; }
.katex-display { margin: 0; }
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
