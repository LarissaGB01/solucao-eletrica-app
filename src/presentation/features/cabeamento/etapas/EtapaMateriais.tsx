import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formCabeamento as textos } from '../../../../content/cabeamento';
import { NumericInput, Question, Segmented } from '../../../ui';
import { opcoesTipoCabo } from '../opcoes';
import type { FormCabeamentoControl } from '../useFormCabeamentoViewModel';

export function EtapaMateriais({
  control,
}: {
  control: FormCabeamentoControl;
}) {
  return (
    <View>
      <Question>{textos.tipoCabo.pergunta}</Question>
      <Controller
        control={control}
        name="tipoCabo"
        render={({ field }) => (
          <Segmented
            accessibilityLabel={textos.tipoCabo.pergunta}
            options={opcoesTipoCabo}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Question>{textos.comprimento.pergunta}</Question>
      <Controller
        control={control}
        name="comprimento"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.comprimento.rotulo}
            unit={textos.comprimento.unidade}
            maxLength={5}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </View>
  );
}
