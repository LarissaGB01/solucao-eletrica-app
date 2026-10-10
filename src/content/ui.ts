export const stepper = {
  voltar: 'Voltar',
  proximo: 'Próximo',
  finalizar: 'Finalizar',
  etapa: (atual: number, total: number) => `Etapa ${atual} de ${total}`,
} as const;
