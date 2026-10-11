import {
  formCabeamentoSchema,
  VALORES_INICIAIS,
  type ValoresFormCabeamento,
} from './formCabeamentoSchema';

const preenchido: ValoresFormCabeamento = {
  ...VALORES_INICIAIS,
  tensao: '127',
  potencia: '2200',
  comprimento: '15',
};

const mensagensPorCampo = (valores: ValoresFormCabeamento) => {
  const result = formCabeamentoSchema.safeParse(valores);
  return result.success
    ? {}
    : Object.fromEntries(
        result.error.issues.map(issue => [issue.path.join('.'), issue.message]),
      );
};

describe('formCabeamentoSchema', () => {
  it('accepts the prefilled values as they are', () => {
    expect(formCabeamentoSchema.safeParse(VALORES_INICIAIS).success).toBe(true);
  });

  it('turns valid text into a ProjetoCabeamento', () => {
    const result = formCabeamentoSchema.safeParse(preenchido);
    expect(result.success && result.data.tensao.volts).toBe(127);
  });

  it('accepts a comma as decimal separator', () => {
    const result = formCabeamentoSchema.safeParse({
      ...preenchido,
      tipoPotencia: 'ATIVA',
      fatorPotencia: '0,92',
    });
    expect(
      result.success &&
        result.data.carga.tipo === 'ATIVA' &&
        result.data.carga.fatorPotencia.valor,
    ).toBe(0.92);
  });

  it('shows pt-BR messages on the empty required fields', () => {
    expect(
      mensagensPorCampo({
        ...VALORES_INICIAIS,
        tensao: '',
        potencia: '',
        comprimento: '',
      }),
    ).toEqual({
      tensao: 'Informe uma tensão inteira maior que zero.',
      potencia: 'Informe uma potência maior que zero.',
      comprimento: 'Informe um comprimento inteiro maior que zero.',
    });
  });

  it('only checks the power factor for active power', () => {
    expect(mensagensPorCampo({ ...preenchido, fatorPotencia: '2' })).toEqual(
      {},
    );
    expect(
      mensagensPorCampo({
        ...preenchido,
        tipoPotencia: 'ATIVA',
        fatorPotencia: '2',
      }),
    ).toEqual({
      fatorPotencia: 'O fator de potência deve ser maior que 0 e no máximo 1.',
    });
  });
});
