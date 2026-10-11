export const resultados = {
  acoes: {
    dimensionarOutro: 'Dimensionar outro',
    inicio: 'Voltar ao início',
  },
  condutor: {
    titulo: 'Condutor Sugerido',
    secao: 'Seção nominal',
    corrente: 'Capacidade de condução',
  },
  disjuntor: {
    titulo: 'Disjuntor Sugerido',
    nome: 'Nome',
    corrente: 'Corrente nominal',
    marca: 'Marca Siemens',
    naoEncontrado:
      'Desculpe, mas não encontrei disjuntor para os parâmetros fornecidos.',
  },
  eletroduto: {
    titulo: 'Eletroduto Sugerido',
    diametro: 'Diâmetro nominal',
    naoEncontrado:
      'Desculpe, mas não encontrei eletroduto para os parâmetros fornecidos.',
  },
  unidades: { corrente: 'A', secao: 'mm²', milimetro: 'mm' },
} as const;
