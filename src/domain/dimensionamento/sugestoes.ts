// Sized components shared by the cabeamento, disjuntor and eletroduto results.

export type CondutorSugerido = Readonly<{
  secaoNominalMm2: number;
  correnteMaximaA: number;
}>;

export type DisjuntorSugerido = Readonly<{
  nome: string;
  correnteNominalA: number;
}>;

export type EletrodutoSugerido = Readonly<{
  diametroNominalPolegadas: string;
  diametroNominalMm: number;
}>;
