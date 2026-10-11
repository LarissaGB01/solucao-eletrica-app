import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { formCabeamento } from '../../../../content/cabeamento';
import { formularios } from '../../../../content/formularios';
import type { TipoPotencia } from '../../../../domain/shared/grandezas';
import { NumericInput, Question, Segmented } from '../../../ui';
import { opcoesFases } from '../../formularios/opcoes';
import { opcoesTipoPotencia } from '../opcoes';
import type { FormCabeamentoControl } from '../useFormCabeamentoViewModel';

const textos = formCabeamento.eletrico;

type Props = {
  control: FormCabeamentoControl;
  tipoPotencia: TipoPotencia;
};

export function EtapaEletrica({ control, tipoPotencia }: Props) {
  return (
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
        name="tensao"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.tensao.rotulo}
            unit={textos.tensao.unidade}
            maxLength={5}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="tipoPotencia"
        render={({ field }) => (
          <Segmented
            accessibilityLabel={textos.tipoPotencia.rotulo}
            options={opcoesTipoPotencia}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="potencia"
        render={({ field, fieldState }) => (
          <NumericInput
            label={textos.potencia.rotulo}
            unit={textos.potencia.unidades[tipoPotencia]}
            maxLength={8}
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      {tipoPotencia === 'ATIVA' && (
        <Controller
          control={control}
          name="fatorPotencia"
          render={({ field, fieldState }) => (
            <NumericInput
              label={textos.fatorPotencia.rotulo}
              maxLength={6}
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      )}
    </View>
  );
}
