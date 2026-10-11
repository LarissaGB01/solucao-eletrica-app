export const formCabeamento = {
  etapas: {
    circuito: 'Circuito',
    eletrica: 'Dados elétricos',
    instalacao: 'Instalação',
    materiais: 'Materiais',
  },
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
    tensao: { rotulo: 'Tensão', unidade: 'V' },
    tipoPotencia: {
      rotulo: 'Tipo de potência',
      opcoes: { APARENTE: 'Aparente', ATIVA: 'Ativa' },
    },
    potencia: {
      rotulo: 'Potência',
      unidades: { APARENTE: 'VA', ATIVA: 'W' },
    },
    fatorPotencia: {
      rotulo: 'Fator de potência',
      dica: (valor: string) => `Mínimo de referência da ANEEL: ${valor}`,
    },
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
    rotulo: 'Comprimento do cabo',
    unidade: 'm',
  },
} as const;
