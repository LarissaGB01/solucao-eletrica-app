import { onde } from './onde';

describe('onde', () => {
  it('pairs each symbol with its meaning, in order', () => {
    expect(onde('correnteProjeto', 'fatorAgrupamento')).toEqual({
      title: 'Onde:',
      items: [
        {
          symbol: 'I_{\\text{projeto}}',
          meaning: 'corrente de projeto, já corrigida pelos fatores, em A',
        },
        { symbol: 'FA', meaning: 'fator de correção de agrupamento' },
      ],
    });
  });
});
