import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formEletroduto as textos } from '../../../content/eletroduto';
import { formularios } from '../../../content/formularios';
import type { ScreenProps } from '../../navigation/routes';
import { NumberSpinner, NumericInput, Question, StepperForm } from '../../ui';
import { useFormEletrodutoViewModel } from './useFormEletrodutoViewModel';

export function FormEletrodutoScreen({
  navigation,
}: ScreenProps<'FormEletroduto'>) {
  const { control, calculando, finalizar } =
    useFormEletrodutoViewModel(navigation);

  const dados = (
    <View>
      <Question>{formularios.dadosEletricos.pergunta}</Question>
      <Controller
        control={control}
        name="secaoNominalCondutor"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.secaoNominalCondutor.rotulo}
            unit={textos.secaoNominalCondutor.unidade}
            maxLength={8}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="quantidadeCondutores"
        render={({ field }) => (
          <NumberSpinner
            label={textos.quantidadeCondutores.pergunta}
            min={1}
            max={100}
            step={1}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </View>
  );

  return (
    <StepperForm
      steps={[{ key: 'dados', content: dados }]}
      onFinish={finalizar}
      busy={calculando}
      busyLabel={formularios.calculando}
    />
  );
}
