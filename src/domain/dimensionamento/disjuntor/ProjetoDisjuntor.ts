import { combinarCampos, type ErrosCampos } from '../../shared/combinarCampos';
import { Corrente } from '../../shared/grandezas';
import { ok, type Result } from '../../shared/Result';
import type { Fases } from '../fases';

export type ProjetoDisjuntor = Readonly<{
  fases: Fases;
  correnteProjeto: Corrente;
  correnteMaximaCondutor: Corrente;
}>;

export type DadosProjetoDisjuntor = Readonly<{
  fases: Fases;
  correnteProjeto: number;
  correnteMaximaCondutor: number;
}>;

export type ErrosProjetoDisjuntor = ErrosCampos<
  'correnteProjeto' | 'correnteMaximaCondutor'
>;

export function criarProjetoDisjuntor(
  dados: DadosProjetoDisjuntor,
): Result<ProjetoDisjuntor, ErrosProjetoDisjuntor> {
  const campos = combinarCampos({
    correnteProjeto: Corrente.create(dados.correnteProjeto),
    correnteMaximaCondutor: Corrente.create(dados.correnteMaximaCondutor),
  });
  return campos.ok ? ok({ fases: dados.fases, ...campos.value }) : campos;
}
