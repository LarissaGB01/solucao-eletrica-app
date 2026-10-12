import type { ScreenProps } from '../../navigation/routes';
import { SecoesView } from '../conteudo/SecoesView';
import { secoesEletroduto } from './secoesEletroduto';

export function PassoAPassoEletrodutoScreen({
  navigation,
  route,
}: ScreenProps<'PassoAPassoEletroduto'>) {
  const { memoria, eletroduto } = route.params;
  return (
    <SecoesView
      secoes={secoesEletroduto(memoria, eletroduto)}
      onAbrirTabela={tabela => navigation.navigate('Tabela', { tabela })}
    />
  );
}
