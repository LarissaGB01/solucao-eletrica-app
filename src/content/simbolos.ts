/** What each formula symbol means, shown under the formulas ("Onde:"). Keys match SIMBOLOS. */
export const significados = {
  titulo: 'Onde:',
  simbolos: {
    potenciaAparente: 'potência aparente, em VA',
    potenciaAtiva: 'potência ativa, em W',
    fatorPotencia: 'fator de potência da carga',
    tensao: 'tensão do circuito, em V',
    temperatura: 'temperatura ambiente, em °C',
    correnteCircuito: 'corrente do circuito, em A',
    quantidadeCircuitos:
      'quantidade de circuitos agrupados no mesmo eletroduto',
    fatorAgrupamento: 'fator de correção de agrupamento',
    fatorTemperatura: 'fator de correção de temperatura',
    correnteProjeto: 'corrente de projeto, já corrigida pelos fatores, em A',
    resistividade: 'resistividade do material do condutor, em Ω·mm²/m',
    comprimento: 'comprimento do cabo, em m',
    quedaTensao: 'queda de tensão máxima permitida, em %',
    secaoCondutor: 'seção calculada do condutor, em mm²',
    secaoNominal: 'seção nominal do condutor escolhido, em mm²',
    correnteNominal: 'corrente nominal do disjuntor, em A',
    correnteMaximaCondutor:
      'capacidade de condução de corrente do condutor, em A',
    diametroCondutor: 'diâmetro do condutor, em mm',
    quantidadeCondutores: 'quantidade de condutores dentro do eletroduto',
    diametroEletroduto: 'diâmetro externo mínimo do eletroduto, em mm',
  },
} as const;
