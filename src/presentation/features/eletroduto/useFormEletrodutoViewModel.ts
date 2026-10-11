import type { ProjetoEletroduto } from '../../../domain/dimensionamento/eletroduto';
import { useUseCases } from '../../di/UseCasesContext';
import type { ScreenProps } from '../../navigation/routes';
import { useCalculo } from '../formularios/useCalculo';
import { useFormularioValidado } from '../formularios/useFormularioValidado';
import {
  formEletrodutoSchema,
  VALORES_INICIAIS_ELETRODUTO,
} from './formEletrodutoSchema';

export function useFormEletrodutoViewModel(
  navigation: ScreenProps<'FormEletroduto'>['navigation'],
) {
  const { dimensionarEletroduto } = useUseCases();
  const { control, handleSubmit } = useFormularioValidado(
    formEletrodutoSchema,
    VALORES_INICIAIS_ELETRODUTO,
  );
  const { calculando, calcular } = useCalculo(
    (projeto: ProjetoEletroduto) => dimensionarEletroduto.execute(projeto),
    resultado => navigation.navigate('ResultadoEletroduto', { resultado }),
  );

  return { control, calculando, finalizar: handleSubmit(calcular) };
}
