import { formatarPolegadas } from './formatarPolegadas';

describe('formatarPolegadas', () => {
  it('separates the whole inches from the fraction', () => {
    expect(formatarPolegadas('1.1/4"')).toBe('1 1/4"');
    expect(formatarPolegadas('2"')).toBe('2"');
    expect(formatarPolegadas('3/4"')).toBe('3/4"');
  });
});
