import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formCabeamento as textos } from '../../../../content/cabeamento';
import { ChipGroup, NumberSpinner, Question } from '../../../ui';
import { opcoesMetodo } from '../opcoes';
import type { FormCabeamentoControl } from '../useFormCabeamentoViewModel';

export function EtapaInstalacao({
  control,
}: {
  control: FormCabeamentoControl;
}) {
  return (
    <View>
      <Question>{textos.metodo.pergunta}</Question>
      <Controller
        control={control}
        name="metodoInstalacao"
        render={({ field }) => (
          <ChipGroup
            accessibilityLabel={textos.metodo.pergunta}
            options={opcoesMetodo}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="circuitosAgrupados"
        render={({ field }) => (
          <NumberSpinner
            label={textos.circuitosAgrupados.pergunta}
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
}
