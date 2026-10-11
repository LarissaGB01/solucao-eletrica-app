export const formCabeamento = {
  finalidade: {
    pergunta: 'Informe a finalidade desse circuito',
    opcoes: { DISTRIBUICAO: 'Distribuição', TERMINAL: 'Terminal' },
  },
  utilizacao: {
    pergunta: 'Informe a forma de utilização desse circuito',
    opcoes: { TOMADA: 'TUGs', ILUMINACAO: 'Iluminação' },
  },
  temperatura: {
    pergunta: 'Informe a temperatura do ambiente de instalação',
    unidade: '°C',
  },
  eletrico: {
    pergunta: 'Informe dados elétricos desse circuito',
    fases: {
      rotulo: 'Fases',
      opcoes: {
        MONOFASICO: 'Monofásico',
        BIFASICO: 'Bifásico',
        TRIFASICO: 'Trifásico',
      },
    },
    tensao: { rotulo: 'Tensão:', unidade: 'Volts' },
    tipoPotencia: {
      rotulo: 'Tipo de potência',
      opcoes: { APARENTE: 'Aparente', ATIVA: 'Ativa' },
    },
    potencia: {
      rotulo: 'Potência:',
      unidades: { APARENTE: 'VoltAmperes', ATIVA: 'Watts' },
    },
    fatorPotencia: { rotulo: 'Fator de Potência:' },
  },
  metodo: {
    pergunta: 'Informe o método de instalação da fiação elétrica',
  },
  circuitosAgrupados: {
    pergunta: 'Informe a quantidade de circuitos agrupados',
  },
  tipoCabo: {
    pergunta: 'Informe o material do cabo utilizado',
    opcoes: { PVC: 'PVC', EPR: 'EPR', ALUMINIO: 'Alumínio' },
  },
  comprimento: {
    pergunta: 'Informe o comprimento do cabo',
    rotulo: 'Comprimento:',
    unidade: 'metros',
  },
  calculando: 'Calculando…',
} as const;

export const resultado = {
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
