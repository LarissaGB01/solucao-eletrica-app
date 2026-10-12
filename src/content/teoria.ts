export const teoria = {
  legendas: {
    trifasico: 'Em circuitos TRIFÁSICOS',
    naoTrifasico: 'Em circuitos NÃO TRIFÁSICOS',
    cobre: 'Para um cabo de COBRE',
    aluminio: 'Para um cabo de ALUMÍNIO',
    distribuicao: 'Para um circuito de DISTRIBUIÇÃO',
    terminal: 'Para um circuito TERMINAL',
  },
  secaoMinima: (utilizacao: string, valorMm2: string) =>
    `Para um circuito de ${utilizacao}, o mínimo aceito para a seção nominal do condutor é ${valorMm2} mm².`,
  utilizacoes: { TOMADA: 'TOMADA', ILUMINACAO: 'ILUMINAÇÃO' },
  tabelas: {
    fatorTemperatura:
      'Fatores de correção de temperatura (NBR 5410, Tabela 40)',
    conducaoPvc:
      'Capacidade de condução de corrente, isolação PVC (NBR 5410, Tabela 36)',
    conducaoEpr:
      'Capacidade de condução de corrente, isolação EPR (NBR 5410, Tabela 37)',
    disjuntores: 'Minidisjuntores Siemens 5SL1, curva C',
    eletrodutos: 'Eletrodutos corrugados Kanalex (Kanaflex)',
  },
  colunas: {
    temperatura: 'Temperatura (°C)',
    secao: 'Seção (mm²)',
    capacidade: 'Capacidade (A)',
    correnteNominal: 'Corrente nominal (A)',
    polos: (polos: number) => (polos === 1 ? '1 polo' : `${polos} polos`),
    polegadas: 'Ø (pol)',
    nominal: 'Ø nominal (mm)',
    externo: 'Ø externo (mm)',
    interno: 'Ø interno (mm)',
  },
  notas: {
    // The NBR is sold by ABNT: show excerpts that explain the table, never the whole table.
    trechoTemperatura:
      'Trecho da tabela. A norma traz os fatores de 10 °C a 80 °C.',
    trechoConducao:
      'Trecho da tabela: condutor de cobre, 2 condutores carregados, corrente em ampères por método de instalação. A norma traz todas as seções e o alumínio.',
    linhaUsada: 'Em destaque, a linha usada no cálculo.',
  },
  ampliar: 'Toque para ampliar',
  fontes: {
    nbr5410: 'Fonte: ABNT NBR 5410:2004 (versão corrigida 2008)',
    siemens: 'Marca: Siemens',
    kanaflex: 'Fonte: Kanaflex, Manual Técnico Kanalex (2025)',
  },
} as const;

/** External documents the tables come from. The NBR is sold by ABNT, so the link is its catalog. */
export const referencias = {
  nbr5410: 'https://www.abntcatalogo.com.br/',
  siemens:
    'https://assets.new.siemens.com/siemens/assets/api/uuid:5e2a000b-6c1f-43be-853e-1799db7956e2/catalogo-minidisjuntores-janeiro-2022-net.pdf',
  kanaflex:
    'https://www.kanaflex.com.br/wp-content/uploads/2025/06/Manual-Tecnico-Kanalex-1.pdf',
} as const;
