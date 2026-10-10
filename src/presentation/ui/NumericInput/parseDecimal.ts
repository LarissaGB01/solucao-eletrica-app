const DECIMAL = /^-?(\d+\.?\d*|\.\d+)$/;

/** Parses user input that may use "," or "." as decimal separator. Returns null if not a number. */
export function parseDecimal(text: string): number | null {
  const normalized = text.trim().replace(',', '.');
  return DECIMAL.test(normalized) ? Number(normalized) : null;
}
