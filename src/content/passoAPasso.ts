export const passoAPasso = {
  dadosInformados: 'Dados Informados',
  rotulos: {
    sistema: 'Sistema',
    instalacao: 'Método de instalação',
    cabo: 'Cabo',
    circuito: 'Circuito',
    utilizacao: 'Utilização',
    temperatura: 'Temperatura ambiente',
    isolacao: 'Isolação',
  },
  resistividade: (material: string) => `Para um cabo de ${material}`,
  quedaTensao: (finalidade: string) => `Para um circuito ${finalidade}`,
  conclusao: 'Logo,',
  materiais: { COBRE: 'COBRE', ALUMINIO: 'ALUMÍNIO' },
  condutor: {
    metodo: 'Método de referência',
    carregados: 'Número de condutores carregados',
    material: 'Condutores',
    isolacao: 'Isolação',
    corrente: 'Para uma corrente ≥',
    secao: 'Para uma seção nominal ≥',
  },
  disjuntor: {
    curva: 'Curva C',
    polos: { 2: 'Bipolar (2P)', 3: 'Tripolar (3P)' },
  },
  eletroduto: {
    diametroExterno: 'Diâmetro nominal externo ≥',
  },
} as const;
