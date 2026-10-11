import { projetoCabeamentoExemplo } from './projetoCabeamentoExemplo';

describe('projetoCabeamentoExemplo', () => {
  it('is a valid project', () => {
    expect(projetoCabeamentoExemplo().tensao.volts).toBe(127);
  });
});
