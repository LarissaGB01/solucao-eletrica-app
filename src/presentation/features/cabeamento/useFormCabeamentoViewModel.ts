import { useEffect, useRef } from 'react';

import type { ProjetoCabeamento } from '../../../domain/dimensionamento/cabeamento';
import { TENSAO_TIPICA_V } from '../../../domain/dimensionamento/valoresTipicos';
import { useUseCases } from '../../di/UseCasesContext';
import type { ScreenProps } from '../../navigation/routes';
import { useCalculo } from '../formularios/useCalculo';
import { texto } from '../formularios/esquema';
import { useFormularioValidado } from '../formularios/useFormularioValidado';
import {
  CAMPOS_POR_ETAPA,
  formCabeamentoSchema,
  VALORES_INICIAIS,
} from './formCabeamentoSchema';

export function useFormCabeamentoViewModel(
  navigation: ScreenProps<'FormCabeamento'>['navigation'],
) {
  const { dimensionarCabeamento } = useUseCases();
  const { control, trigger, handleSubmit, watch, getValues, setValue } =
    useFormularioValidado(formCabeamentoSchema, VALORES_INICIAIS);
  // The typical voltage follows the phase system, but only while the user kept the suggestion.
  const fases = watch('fases');
  const fasesAnterior = useRef(fases);
  useEffect(() => {
    const anterior = fasesAnterior.current;
    fasesAnterior.current = fases;
    if (
      anterior !== fases &&
      getValues('tensao') === texto(TENSAO_TIPICA_V[anterior])
    ) {
      setValue('tensao', texto(TENSAO_TIPICA_V[fases]), {
        shouldValidate: true,
      });
    }
  }, [fases, getValues, setValue]);

  const { calculando, calcular } = useCalculo(
    (projeto: ProjetoCabeamento) => dimensionarCabeamento.execute(projeto),
    resultado => navigation.navigate('ResultadoCabeamento', { resultado }),
  );

  return {
    control,
    tipoPotencia: watch('tipoPotencia'),
    fases,
    calculando,
    podeAvancar: (etapa: number) =>
      trigger([...(CAMPOS_POR_ETAPA[etapa] ?? [])]),
    finalizar: handleSubmit(calcular),
  };
}

export type FormCabeamentoControl = ReturnType<
  typeof useFormCabeamentoViewModel
>['control'];
