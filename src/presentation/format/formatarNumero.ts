/** pt-BR decimal: 2.5 → "2,50". Avoids Intl so output is identical on every Hermes build. */
export const formatarNumero = (valor: number, casas = 2): string =>
  valor.toFixed(casas).replace('.', ',');
