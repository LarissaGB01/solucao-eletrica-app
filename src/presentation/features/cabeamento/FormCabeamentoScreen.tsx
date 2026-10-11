import { formularios } from '../../../content/formularios';
import type { ScreenProps } from '../../navigation/routes';
import { type Step, StepperForm } from '../../ui';
import { EtapaCircuito } from './etapas/EtapaCircuito';
import { EtapaEletrica } from './etapas/EtapaEletrica';
import { EtapaInstalacao } from './etapas/EtapaInstalacao';
import { EtapaMateriais } from './etapas/EtapaMateriais';
import { useFormCabeamentoViewModel } from './useFormCabeamentoViewModel';

export function FormCabeamentoScreen({
  navigation,
}: ScreenProps<'FormCabeamento'>) {
  const { control, tipoPotencia, calculando, podeAvancar, finalizar } =
    useFormCabeamentoViewModel(navigation);

  const etapas: Step[] = [
    { key: 'circuito', content: <EtapaCircuito control={control} /> },
    {
      key: 'eletrica',
      content: <EtapaEletrica control={control} tipoPotencia={tipoPotencia} />,
    },
    { key: 'instalacao', content: <EtapaInstalacao control={control} /> },
    { key: 'materiais', content: <EtapaMateriais control={control} /> },
  ];

  return (
    <StepperForm
      steps={etapas}
      canAdvance={podeAvancar}
      onFinish={finalizar}
      busy={calculando}
      busyLabel={formularios.calculando}
    />
  );
}
