import { formularios } from '../../../content/formularios';
import { referencias, teoria } from '../../../content/teoria';
import type { Fases } from '../../../domain/dimensionamento/fases';
import type { Bloco } from '../conteudo/Bloco';

export const linha = (rotulo: string, valor: string): Bloco => ({
  tipo: 'texto',
  texto: `${rotulo}: ${valor}`,
});

export const formula = (expressoes: readonly string[]): Bloco => ({
  tipo: 'formula',
  expressoes,
});

export const rotuloFases = (fases: Fases) => formularios.fases.opcoes[fases];

export const linkNbr: Bloco = {
  tipo: 'link',
  rotulo: teoria.fontes.nbr5410,
  url: referencias.nbr5410,
};
