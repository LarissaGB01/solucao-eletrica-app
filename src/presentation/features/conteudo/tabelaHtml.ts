import { colors } from '../../theme';
import type { Tabela } from './Bloco';

const escapar = (texto: string) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Full-screen page for one table. A WebView gives pinch-to-zoom and panning on Android and
 * iOS without a gesture library; the viewport allows up to 5×.
 */
export function tabelaHtml(tabela: Tabela): string {
  const cabecalho = tabela.colunas
    .map(coluna => `<th>${escapar(coluna)}</th>`)
    .join('');
  const linhas = tabela.linhas
    .map(
      (linha, indice) =>
        `<tr${indice === tabela.destaque ? ' class="destaque"' : ''}>${linha
          .map(celula => `<td>${escapar(celula)}</td>`)
          .join('')}</tr>`,
    )
    .join('');
  const nota =
    tabela.nota === undefined ? '' : `<p>${escapar(tabela.nota)}</p>`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes">
<style>
  body { margin: 16px; font-family: -apple-system, Roboto, sans-serif; color: ${
    colors.text
  }; background: ${colors.background}; }
  h1 { font-size: 17px; line-height: 1.4; color: ${
    colors.textStrong
  }; margin: 0 0 12px; }
  table { border-collapse: collapse; font-size: 15px; }
  th, td { border: 1px solid ${
    colors.borderSubtle
  }; padding: 8px 10px; text-align: center; white-space: nowrap; }
  th { background: ${colors.surface}; color: ${colors.textStrong}; }
  tr.destaque td { background: ${colors.headerBackground}; color: ${
    colors.primaryDark
  }; font-weight: bold; }
  p { font-size: 13px; line-height: 1.4; color: ${colors.textMuted}; }
</style>
</head>
<body>
<h1>${escapar(tabela.titulo)}</h1>
<table><thead><tr>${cabecalho}</tr></thead><tbody>${linhas}</tbody></table>
${nota}
</body>
</html>`;
}
