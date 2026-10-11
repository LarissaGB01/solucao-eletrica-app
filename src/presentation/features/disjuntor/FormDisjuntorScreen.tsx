import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formDisjuntor as textos } from '../../../content/disjuntor';
import { formularios } from '../../../content/formularios';
import { VALORES_TIPICOS } from '../../../domain/dimensionamento/valoresTipicos';
import type { ScreenProps } from '../../navigation/routes';
import { NumericInput, Question, Segmented, StepperForm } from '../../ui';
import { opcoesFases } from '../formularios/opcoes';
import { useFormDisjuntorViewModel } from './useFormDisjuntorViewModel';

export function FormDisjuntorScreen({
  navigation,
}: ScreenProps<'FormDisjuntor'>) {
  const { control, calculando, finalizar } =
    useFormDisjuntorViewModel(navigation);

  const dados = (
    <View>
      <Question>{formularios.dadosEletricos.pergunta}</Question>
      <Controller
        control={control}
        name="fases"
        render={({ field }) => (
          <Segmented
            accessibilityLabel={formularios.fases.rotulo}
            options={opcoesFases}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="correnteProjeto"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.correnteProjeto.rotulo}
            unit={textos.correnteProjeto.unidade}
            hint={formularios.valorTipico(
              `${VALORES_TIPICOS.correnteProjetoA} ${textos.correnteProjeto.unidade}`,
            )}
            maxLength={8}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="correnteMaximaCondutor"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.correnteMaximaCondutor.rotulo}
            unit={textos.correnteMaximaCondutor.unidade}
            hint={textos.correnteMaximaCondutor.dica(
              `${VALORES_TIPICOS.correnteMaximaCondutorA} ${textos.correnteMaximaCondutor.unidade}`,
            )}
            maxLength={8}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
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
