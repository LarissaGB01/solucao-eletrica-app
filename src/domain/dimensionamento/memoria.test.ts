import { minimoAplicado, secaoAdotadaMm2 } from './memoria';
import { RESULTADO_CABEAMENTO_EXEMPLO } from './resultadosExemplo';

const memoria = RESULTADO_CABEAMENTO_EXEMPLO.memoria.condutor;

describe('secaoAdotadaMm2', () => {
  it('uses the NBR minimum when the calculated section is smaller', () => {
    expect(secaoAdotadaMm2(memoria)).toBe(2.5);
    expect(minimoAplicado(memoria)).toBe(true);
  });

  it('keeps the calculated section when it is above the minimum', () => {
    const grande = { ...memoria, secaoCalculadaMm2: 5.2 };
    expect(secaoAdotadaMm2(grande)).toBe(5.2);
    expect(minimoAplicado(grande)).toBe(false);
  });
});
