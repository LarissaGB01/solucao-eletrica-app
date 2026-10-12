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
    fatorTemperatura: 'Tabela de fatores de correção de temperatura',
    conducaoPvc: 'Tabela de capacidade de condução de corrente, isolação PVC',
    conducaoEpr: 'Tabela de capacidade de condução de corrente, isolação EPR',
    disjuntores: 'Catálogo de minidisjuntores Siemens',
    eletrodutos: 'Catálogo de eletrodutos Kanalex (Kanaflex)',
  },
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
