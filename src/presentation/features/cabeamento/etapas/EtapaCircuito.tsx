import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formCabeamento as textos } from '../../../../content/cabeamento';
import { NumberSpinner, Question, Segmented } from '../../../ui';
import { opcoesFinalidade, opcoesUtilizacao } from '../opcoes';
import type { FormCabeamentoControl } from '../useFormCabeamentoViewModel';

export function EtapaCircuito({ control }: { control: FormCabeamentoControl }) {
  return (
    <View>
      <Question>{textos.finalidade.pergunta}</Question>
      <Controller
        control={control}
        name="finalidade"
        render={({ field }) => (
          <Segmented
            accessibilityLabel={textos.finalidade.pergunta}
            options={opcoesFinalidade}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Question>{textos.utilizacao.pergunta}</Question>
      <Controller
        control={control}
        name="utilizacao"
        render={({ field }) => (
          <Segmented
            accessibilityLabel={textos.utilizacao.pergunta}
            options={opcoesUtilizacao}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="temperaturaAmbiente"
        render={({ field }) => (
          <NumberSpinner
            label={textos.temperatura.pergunta}
            unit={textos.temperatura.unidade}
            min={10}
            max={80}
            step={5}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </View>
  );
}
