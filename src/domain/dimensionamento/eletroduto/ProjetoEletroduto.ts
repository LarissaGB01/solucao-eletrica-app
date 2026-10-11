import { combinarCampos, type ErrosCampos } from '../../shared/combinarCampos';
import { QuantidadeCondutores, SecaoNominal } from '../../shared/grandezas';
import type { Result } from '../../shared/Result';

export type ProjetoEletroduto = Readonly<{
  secaoNominalCondutor: SecaoNominal;
  quantidadeCondutores: QuantidadeCondutores;
}>;

export type DadosProjetoEletroduto = Readonly<{
  secaoNominalCondutor: number;
  quantidadeCondutores: number;
}>;

export type ErrosProjetoEletroduto = ErrosCampos<
  'secaoNominalCondutor' | 'quantidadeCondutores'
>;

export function criarProjetoEletroduto(
  dados: DadosProjetoEletroduto,
): Result<ProjetoEletroduto, ErrosProjetoEletroduto> {
  return combinarCampos({
    secaoNominalCondutor: SecaoNominal.create(dados.secaoNominalCondutor),
    quantidadeCondutores: QuantidadeCondutores.create(
      dados.quantidadeCondutores,
    ),
  });
}
