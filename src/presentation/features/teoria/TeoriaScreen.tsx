import type { ScreenProps } from '../../navigation/routes';
import { SecoesView } from '../conteudo/SecoesView';
import { secoesTeoria } from './secoesTeoria';

export function TeoriaScreen({ navigation }: ScreenProps<'Teoria'>) {
  return (
    <SecoesView
      secoes={secoesTeoria}
      onAbrirTabela={tabela => navigation.navigate('Tabela', { tabela })}
    />
  );
}
