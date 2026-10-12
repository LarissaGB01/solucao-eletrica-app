import type { ScreenProps } from '../../navigation/routes';
import { SecoesView } from '../conteudo/SecoesView';
import { secoesCondutor } from './secoesCondutor';

export function PassoAPassoCondutorScreen({
  navigation,
  route,
}: ScreenProps<'PassoAPassoCondutor'>) {
  const { memoria, condutor } = route.params;
  return (
    <SecoesView
      secoes={secoesCondutor(memoria, condutor)}
      onAbrirTabela={tabela => navigation.navigate('Tabela', { tabela })}
    />
  );
}
