import { calcularEletroduto } from '../motor';
import { ELETRODUTOS } from './eletrodutos';

describe('ELETRODUTOS (Kanalex 2025)', () => {
  it('is ordered by diameter, with internal smaller than external', () => {
    ELETRODUTOS.forEach(([, nominal, externo, interno], i) => {
      expect(interno).toBeLessThan(externo);
      const anterior = ELETRODUTOS[i - 1];
      if (anterior) expect(nominal).toBeGreaterThan(anterior[1]);
    });
  });

  it('uses the 2025 external diameters (1.1/2" is now 55 mm)', () => {
    // 6 mm² × 8 conductors needs more than 55.3 mm: 2" now, 1.1/2" with the 2023 catalog.
    expect(calcularEletroduto(6, 8).eletroduto).toEqual({
      diametroNominalPolegadas: '2"',
      diametroNominalMm: 50,
    });
  });
});
