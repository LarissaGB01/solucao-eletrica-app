import { combinarCampos } from './combinarCampos';
import { domainError } from './DomainError';
import { err, ok } from './Result';

describe('combinarCampos', () => {
  it('returns every value when all fields are valid', () => {
    expect(combinarCampos({ a: ok(1), b: ok('x') })).toEqual(
      ok({ a: 1, b: 'x' }),
    );
  });

  it('returns the error of every invalid field', () => {
    const tensao = domainError('TENSAO_INVALIDA', 0);
    const comprimento = domainError('COMPRIMENTO_INVALIDO', -1);

    expect(
      combinarCampos({
        tensao: err(tensao),
        ok: ok(1),
        comprimento: err(comprimento),
      }),
    ).toEqual(err({ tensao, comprimento }));
  });
});
