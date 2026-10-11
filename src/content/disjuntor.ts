export const formDisjuntor = {
  correnteProjeto: { rotulo: 'Corrente de projeto', unidade: 'A' },
  correnteMaximaCondutor: {
    rotulo: 'Corrente máxima do condutor',
    unidade: 'A',
    dica: (valor: string) => `Cabo de 2,5 mm² (PVC, B1): ${valor}`,
  },
} as const;
