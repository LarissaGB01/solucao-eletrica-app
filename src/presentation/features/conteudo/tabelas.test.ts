import {
  conducaoUsada,
  fatorTemperaturaUsado,
  tabelaDisjuntores,
  tabelaEletrodutos,
  trechoConducao,
  trechoFatorTemperatura,
} from './tabelas';

describe('NBR 5410 tables appear only as excerpts', () => {
  it('temperature factors: 4 rows around 30 °C, both insulations', () => {
    expect(trechoFatorTemperatura().linhas).toEqual([
      ['25', '1,06', '1,04'],
      ['30', '1', '1'],
      ['35', '0,94', '0,96'],
      ['40', '0,87', '0,91'],
    ]);
  });

  it('conduction: copper, 2 loaded conductors, 1,5 to 10 mm², methods A1 to D', () => {
    const tabela = trechoConducao('PVC');
    expect(tabela.colunas).toEqual([
      'Seção (mm²)',
      'A1',
      'A2',
      'B1',
      'B2',
      'C',
      'D',
    ]);
    expect(tabela.linhas.map(([secao]) => secao)).toEqual([
      '1,5',
      '2,5',
      '4',
      '6',
      '10',
    ]);
    expect(tabela.linhas[1]?.[3]).toBe('24'); // 2,5 mm², B1: the example result
  });
});

describe('Passo a passo highlights the row used', () => {
  it('temperature: the first row at or above the ambient temperature, with neighbours', () => {
    const tabela = fatorTemperaturaUsado(32, 'PVC');
    expect(tabela.linhas).toEqual([
      ['30', '1'],
      ['35', '0,94'],
      ['40', '0,87'],
    ]);
    expect(tabela.destaque).toBe(1);
    expect(tabela.nota).toBe('Em destaque, a linha usada no cálculo.');
  });

  it('temperature at the start of the table has no row before it', () => {
    const tabela = fatorTemperaturaUsado(10, 'EPR');
    expect(tabela.linhas[0]).toEqual(['10', '1,15']);
    expect(tabela.destaque).toBe(0);
  });

  it('conduction: the circuit column around the chosen section', () => {
    const tabela = conducaoUsada('COBRE', 'PVC', 'B1', 2, 2.5);
    expect(tabela.colunas).toEqual(['Seção (mm²)', 'Capacidade (A), B1']);
    expect(tabela.linhas[tabela.destaque ?? -1]).toEqual(['2,5', '24']);
    expect(tabela.linhas).toHaveLength(4);
  });

  it('breakers: whole catalog, chosen current highlighted', () => {
    const tabela = tabelaDisjuntores(20);
    expect(tabela.colunas).toEqual([
      'Corrente nominal (A)',
      '1 polo',
      '2 polos',
      '3 polos',
    ]);
    expect(tabela.linhas[tabela.destaque ?? -1]).toEqual([
      '20',
      '5SL1 120-7MB',
      '5SL1 220-7MB',
      '5SL1 320-7MB',
    ]);
    expect(tabelaDisjuntores().destaque).toBeUndefined();
  });

  it('conduits: whole 2025 Kanalex catalog, chosen size highlighted', () => {
    const tabela = tabelaEletrodutos('1.1/4"');
    expect(tabela.linhas).toHaveLength(9);
    expect(tabela.linhas[tabela.destaque ?? -1]).toEqual([
      '1 1/4"',
      '30',
      '41,3',
      '31,5',
    ]);
  });

  it('never highlights when the value is not in the table', () => {
    expect(tabelaEletrodutos('9"').destaque).toBeUndefined();
    expect(tabelaDisjuntores(999).destaque).toBeUndefined();
  });
});
