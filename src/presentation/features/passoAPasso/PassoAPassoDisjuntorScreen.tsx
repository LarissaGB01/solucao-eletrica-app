import type { ScreenProps } from '../../navigation/routes';
import { SecoesView } from '../conteudo/SecoesView';
import { secoesDisjuntor } from './secoesDisjuntor';

export function PassoAPassoDisjuntorScreen({
  navigation,
  route,
}: ScreenProps<'PassoAPassoDisjuntor'>) {
  const { memoria, disjuntor } = route.params;
  return (
    <SecoesView
      secoes={secoesDisjuntor(memoria, disjuntor)}
      onAbrirTabela={tabela => navigation.navigate('Tabela', { tabela })}
    />
  );
}
