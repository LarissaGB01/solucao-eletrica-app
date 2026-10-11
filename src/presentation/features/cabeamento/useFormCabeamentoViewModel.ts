import type { ProjetoCabeamento } from '../../../domain/dimensionamento/cabeamento';
import { useUseCases } from '../../di/UseCasesContext';
import type { ScreenProps } from '../../navigation/routes';
import { useCalculo } from '../formularios/useCalculo';
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
  const { control, trigger, handleSubmit, watch } = useFormularioValidado(
    formCabeamentoSchema,
    VALORES_INICIAIS,
  );
  const { calculando, calcular } = useCalculo(
    (projeto: ProjetoCabeamento) => dimensionarCabeamento.execute(projeto),
    resultado => navigation.navigate('ResultadoCabeamento', { resultado }),
  );

  return {
    control,
    tipoPotencia: watch('tipoPotencia'),
    calculando,
    podeAvancar: (etapa: number) =>
      trigger([...(CAMPOS_POR_ETAPA[etapa] ?? [])]),
    finalizar: handleSubmit(calcular),
  };
}

export type FormCabeamentoControl = ReturnType<
  typeof useFormCabeamentoViewModel
>['control'];
