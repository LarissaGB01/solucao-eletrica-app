import { parseDecimal } from './parseDecimal';

describe('parseDecimal', () => {
  it.each([
    ['220', 220],
    ['0,8', 0.8],
    ['0.8', 0.8],
    [' 12,5 ', 12.5],
    ['12,', 12],
    [',5', 0.5],
    ['-3', -3],
  ])('parses %p as %p', (text, expected) => {
    expect(parseDecimal(text)).toBe(expected);
  });

  it.each(['', ' ', 'abc', '1,2,3', '1.2.3', '1,2.3', '12a', '-', ','])(
    'rejects %p',
    text => {
      expect(parseDecimal(text)).toBeNull();
    },
  );
});
