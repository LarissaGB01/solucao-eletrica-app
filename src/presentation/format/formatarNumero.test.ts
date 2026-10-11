import { formatarNumero } from './formatarNumero';

describe('formatarNumero', () => {
  it('uses a comma and fixed decimals', () => {
    expect(formatarNumero(2.5)).toBe('2,50');
    expect(formatarNumero(20, 0)).toBe('20');
  });
});
