import { useState } from 'react';
import { Alert } from 'react-native';

import type { FalhaCalculo } from '../../../application/shared/calcular';
import { mensagensErro } from '../../../content/erros';
import type { Result } from '../../../domain/shared/Result';

/** Runs a sizing use case: tracks the busy state, hands the result on, alerts on failure. */
export function useCalculo<Projeto, Resultado>(
  executar: (projeto: Projeto) => Promise<Result<Resultado, FalhaCalculo>>,
  aoConcluir: (resultado: Resultado) => void,
) {
  const [calculando, setCalculando] = useState(false);

  const calcular = async (projeto: Projeto) => {
    setCalculando(true);
    const resultado = await executar(projeto);
    setCalculando(false);
    if (resultado.ok) {
      aoConcluir(resultado.value);
    } else {
      Alert.alert(mensagensErro[resultado.error.codigo]);
    }
  };

  return { calculando, calcular };
}
