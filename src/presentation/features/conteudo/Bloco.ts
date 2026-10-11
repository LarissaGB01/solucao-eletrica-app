import type { ImageSourcePropType } from 'react-native';

/** One piece of an explanatory section (Teoria now, Passo a passo next). */
export type Bloco =
  | { tipo: 'formula'; expressoes: readonly string[]; legenda?: string }
  | { tipo: 'texto'; texto: string }
  | {
      tipo: 'tabela';
      imagem: ImageSourcePropType;
      proporcao: number;
      descricao: string;
    }
  | { tipo: 'link'; rotulo: string; url: string };

export type Secao = { titulo: string; blocos: readonly Bloco[] };
