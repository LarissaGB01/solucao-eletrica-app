import { err, map, ok } from './Result';

describe('Result', () => {
  it('wraps a success value', () => {
    expect(ok(42)).toEqual({ ok: true, value: 42 });
  });

  it('wraps an error', () => {
    expect(err('invalid')).toEqual({ ok: false, error: 'invalid' });
  });

  it('maps only success values', () => {
    expect(map(ok(2), n => n * 10)).toEqual(ok(20));
    expect(map(err('invalid'), (n: number) => n * 10)).toEqual(err('invalid'));
  });
});
