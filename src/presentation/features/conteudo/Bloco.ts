/** A table drawn by the app (Teoria, Passo a passo and the full-screen view). Plain data. */
export type Tabela = Readonly<{
  titulo: string;
  colunas: readonly string[];
  linhas: readonly (readonly string[])[];
  /** Index in `linhas` of the row used in the calculation. */
  destaque?: number;
  nota?: string;
}>;

/** One piece of an explanatory section (Teoria and Passo a passo). */
export type Bloco =
  | { tipo: 'formula'; expressoes: readonly string[]; legenda?: string }
  | { tipo: 'texto'; texto: string }
  | { tipo: 'tabela'; tabela: Tabela }
  | { tipo: 'link'; rotulo: string; url: string };

/** `valor` is the section's result, shown on the right of its header. */
export type Secao = {
  titulo: string;
  valor?: string;
  blocos: readonly Bloco[];
};
