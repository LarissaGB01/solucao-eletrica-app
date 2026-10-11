import { combinarCampos, type ErrosCampos } from '../../shared/combinarCampos';
import { Corrente } from '../../shared/grandezas';
import { domainError } from '../../shared/DomainError';
import { err, ok, type Result } from '../../shared/Result';
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
  if (!campos.ok) {
    return campos;
  }
  const { correnteProjeto, correnteMaximaCondutor } = campos.value;
  // A breaker must fit strictly between both currents, so the conductor must carry more.
  if (correnteMaximaCondutor.amperes <= correnteProjeto.amperes) {
    return err({
      correnteMaximaCondutor: domainError(
        'CORRENTE_MAXIMA_INSUFICIENTE',
        correnteMaximaCondutor.amperes,
      ),
    });
  }
  return ok({ fases: dados.fases, correnteProjeto, correnteMaximaCondutor });
}
