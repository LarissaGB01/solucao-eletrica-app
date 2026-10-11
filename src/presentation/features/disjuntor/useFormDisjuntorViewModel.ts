import type { ProjetoDisjuntor } from '../../../domain/dimensionamento/disjuntor';
import { useUseCases } from '../../di/UseCasesContext';
import type { ScreenProps } from '../../navigation/routes';
import { useCalculo } from '../formularios/useCalculo';
import { useFormularioValidado } from '../formularios/useFormularioValidado';
import {
  formDisjuntorSchema,
  VALORES_INICIAIS_DISJUNTOR,
} from './formDisjuntorSchema';

export function useFormDisjuntorViewModel(
  navigation: ScreenProps<'FormDisjuntor'>['navigation'],
) {
  const { dimensionarDisjuntor } = useUseCases();
  const { control, handleSubmit } = useFormularioValidado(
    formDisjuntorSchema,
    VALORES_INICIAIS_DISJUNTOR,
  );
  const { calculando, calcular } = useCalculo(
    (projeto: ProjetoDisjuntor) => dimensionarDisjuntor.execute(projeto),
    resultado => navigation.navigate('ResultadoDisjuntor', { resultado }),
  );

  return { control, calculando, finalizar: handleSubmit(calcular) };
}
