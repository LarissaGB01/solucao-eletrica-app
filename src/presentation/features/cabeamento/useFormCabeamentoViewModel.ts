import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { mensagensErro } from '../../../content/erros';
import type { ProjetoCabeamento } from '../../../domain/dimensionamento/cabeamento';
import { useUseCases } from '../../di/UseCasesContext';
import type { ScreenProps } from '../../navigation/routes';
import {
  CAMPOS_POR_ETAPA,
  formCabeamentoSchema,
  VALORES_INICIAIS,
  type ValoresFormCabeamento,
} from './formCabeamentoSchema';

export function useFormCabeamentoViewModel(
  navigation: ScreenProps<'FormCabeamento'>['navigation'],
) {
  const { dimensionarCabeamento } = useUseCases();
  const [calculando, setCalculando] = useState(false);
  const { control, trigger, handleSubmit, watch } = useForm<
    ValoresFormCabeamento,
    unknown,
    ProjetoCabeamento
  >({
    resolver: zodResolver(formCabeamentoSchema),
    defaultValues: VALORES_INICIAIS,
    // Re-check edited fields live, so a message disappears as soon as the value is fixed
    // (the default only re-validates after a full submit, not after a step check).
    mode: 'onChange',
  });

  const podeAvancar = (etapa: number) =>
    trigger([...(CAMPOS_POR_ETAPA[etapa] ?? [])]);

  const finalizar = handleSubmit(async projeto => {
    setCalculando(true);
    const resultado = await dimensionarCabeamento.execute(projeto);
    setCalculando(false);
    if (resultado.ok) {
      navigation.navigate('ResultadoCabeamento', {
        resultado: resultado.value,
      });
    } else {
      Alert.alert(mensagensErro[resultado.error.codigo]);
    }
  });

  return {
    control,
    tipoPotencia: watch('tipoPotencia'),
    calculando,
    podeAvancar,
    finalizar,
  };
}

export type FormCabeamentoControl = ReturnType<
  typeof useFormCabeamentoViewModel
>['control'];
