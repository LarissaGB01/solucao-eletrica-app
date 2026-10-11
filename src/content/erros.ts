// Keyed by domain/application error codes; the presentation layer checks the keys at compile time.
export const mensagensErro = {
  TENSAO_INVALIDA: 'Informe uma tensão inteira maior que zero.',
  POTENCIA_INVALIDA: 'Informe uma potência maior que zero.',
  FATOR_POTENCIA_INVALIDO:
    'O fator de potência deve ser maior que 0 e no máximo 1.',
  TEMPERATURA_INVALIDA: 'Informe uma temperatura inteira maior que zero.',
  COMPRIMENTO_INVALIDO: 'Informe um comprimento inteiro maior que zero.',
  QUANTIDADE_CIRCUITOS_INVALIDA: 'Informe pelo menos 1 circuito.',
  CORRENTE_INVALIDA: 'Informe uma corrente maior que zero.',
  SECAO_INVALIDA: 'Informe uma seção maior que zero.',
  QUANTIDADE_CONDUTORES_INVALIDA: 'Informe pelo menos 1 condutor.',
  CORRENTE_MAXIMA_INSUFICIENTE:
    'A corrente máxima do condutor deve ser maior que a corrente de projeto.',
  TEMPERATURA_FORA_DA_TABELA:
    'Não há fator de correção para essa temperatura e esse cabo. Tente outra temperatura ou outro cabo.',
  CONDUTOR_NAO_ENCONTRADO:
    'Nenhum condutor da tabela atende a esses dados. Tente outro método de instalação, cabo ou mais circuitos.',
  FALHA_CALCULO: 'Erro inesperado. Tente novamente!',
} as const;
