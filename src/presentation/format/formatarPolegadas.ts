/** Catalogue notation "1.1/4\"" (one and a quarter inch) shown as "1 1/4\"". */
export const formatarPolegadas = (valor: string): string =>
  valor.replace(/^(\d+)\.(\d+\/\d+)/, '$1 $2');
