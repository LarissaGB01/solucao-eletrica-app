import { formCabeamento } from '../../../content/cabeamento';
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
  const { control, tipoPotencia, fases, calculando, podeAvancar, finalizar } =
    useFormCabeamentoViewModel(navigation);

  const etapas: Step[] = [
    {
      key: 'circuito',
      title: formCabeamento.etapas.circuito,
      content: <EtapaCircuito control={control} />,
    },
    {
      key: 'eletrica',
      title: formCabeamento.etapas.eletrica,
      content: (
        <EtapaEletrica
          control={control}
          tipoPotencia={tipoPotencia}
          fases={fases}
        />
      ),
    },
    {
      key: 'instalacao',
      title: formCabeamento.etapas.instalacao,
      content: <EtapaInstalacao control={control} />,
    },
    {
      key: 'materiais',
      title: formCabeamento.etapas.materiais,
      content: <EtapaMateriais control={control} />,
    },
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
