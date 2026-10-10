import { domainError } from './DomainError';

it('builds an error with code and received value', () => {
  expect(domainError('TENSAO_INVALIDA', -1)).toEqual({
    codigo: 'TENSAO_INVALIDA',
    valorRecebido: -1,
  });
});
