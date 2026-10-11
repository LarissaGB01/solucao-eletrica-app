// Regenerates the golden fixtures from the original Java backend.
// Not part of the build: run it only when the reference behaviour must be re-captured.
//
//   1. docker run -d --name normativas-golden -e POSTGRES_PASSWORD=golden \
//        -e POSTGRES_DB=normativas_db -p 5433:5432 postgres:16-alpine
//   2. docker exec -i normativas-golden psql -U postgres -d normativas_db \
//        < ../solucao_eletrica_backend/src/main/resources/normativas.sql
//   3. java -jar ../solucao_eletrica_backend/target/solucao_eletrica_backend-1.0.jar --server.port=8089 \
//        --spring.datasource.url=jdbc:postgresql://localhost:5433/normativas_db \
//        --spring.datasource.username=postgres --spring.datasource.password=golden
//   4. node scripts/golden/gerar-golden.mjs
//
// Decimals are sent with two places: the backend keeps the scale of its BigDecimal inputs, so
// integers would truncate its intermediate results (2200/127 -> 17 instead of 17.32).

import { writeFileSync } from 'node:fs';

import { cabeamento, disjuntor, eletroduto } from './entradas.mjs';

const API = 'http://localhost:8089';
const DESTINO = new URL(
  '../../src/domain/dimensionamento/nbr5410/golden/',
  import.meta.url,
);

// JSON.stringify drops trailing zeros (2200.00 -> 2200), so decimals are written by hand.
const decimal = valor => ({ __decimal: valor.toFixed(2) });
const json = objeto =>
  JSON.stringify(objeto, (_, v) =>
    v?.__decimal ? `@@${v.__decimal}@@` : v,
  ).replace(/"@@([^@]+)@@"/g, '$1');

async function post(rota, corpo) {
  const resposta = await fetch(`${API}${rota}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json(corpo),
  });
  return { ok: resposta.ok, corpo: await resposta.json() };
}

const corpoCabeamento = e => ({
  tipoCircuito: e.finalidade,
  utilizacaoCircuito: e.utilizacao,
  fasesVoltagem: e.fases,
  voltagem: e.tensao,
  potenciaAparente: decimal(e.tipoPotencia === 'APARENTE' ? e.potencia : 0),
  potenciaAtiva: decimal(e.tipoPotencia === 'ATIVA' ? e.potencia : 0),
  fatorDePotencia: decimal(e.tipoPotencia === 'ATIVA' ? e.fatorPotencia : 0),
  metodoInstalacao: e.metodoInstalacao,
  tipoCabo: e.tipoCabo,
  temperaturaAmbiente: e.temperaturaAmbiente,
  quantidadeCircuitosAgrupados: e.circuitosAgrupados,
  comprimentoFio: e.comprimento,
});

const disjuntorDe = d =>
  d.correnteNominalDisjuntorRecomendado === 0
    ? null
    : {
        nome: d.nomeDisjuntorRecomendado,
        correnteNominalA: d.correnteNominalDisjuntorRecomendado,
      };

const eletrodutoDe = e =>
  e.diametroNominalEletrodutoSugeridoMilimetros === 0
    ? null
    : {
        diametroNominalPolegadas: e.diametroNominalEletrodutoSugeridoPolegadas,
        diametroNominalMm: e.diametroNominalEletrodutoSugeridoMilimetros,
      };

async function gerarCabeamento() {
  const casos = [];
  for (const entrada of cabeamento) {
    const { ok, corpo } = await post('/dimensionar', corpoCabeamento(entrada));
    if (!ok) {
      casos.push({ entrada, erro: corpo.codigo });
      continue;
    }
    const { calculoSecaoCondutor: c, calculoEletroduto: el } =
      corpo.dadosUtilizadosParaCalculo;
    const dim = corpo.dadosDimensionados;
    casos.push({
      entrada,
      saida: {
        potenciaAparenteVA: c.calculoPotenciaAparente.potenciaAparente,
        correnteCircuitoA: c.calculoCorrenteProjeto.correnteCircuito,
        fatorAgrupamento: c.calculoCorrenteProjeto.fatorAgrupamento,
        fatorTemperatura: c.calculoCorrenteProjeto.fatorTemperatura,
        correnteProjetoA: c.calculoCorrenteProjeto.correnteProjeto,
        secaoCalculadaMm2: c.calculoDiametroMinimoCabo.diametroCalculado,
        condutor: {
          secaoNominalMm2: dim.cabeamento.secaoNominalCondutor,
          correnteMaximaA: dim.cabeamento.correnteMaximaCondutor,
        },
        disjuntor: disjuntorDe(dim.disjuntor),
        eletroduto: eletrodutoDe(dim.eletroduto),
        quantidadeCondutores: el.quantidadeCondutores,
        diametroCondutorMm: el.diametroCabo,
        diametroMinimoEletrodutoMm: el.diametroMinimoCalculado,
      },
    });
  }
  return casos;
}

async function gerarDisjuntor() {
  const casos = [];
  for (const entrada of disjuntor) {
    const { ok, corpo } = await post('/dimensionar/disjuntores', {
      fasesVoltagem: entrada.fases,
      correnteProjeto: decimal(entrada.correnteProjeto),
      correnteMaximaCabo: decimal(entrada.correnteMaximaCondutor),
    });
    casos.push(
      ok
        ? { entrada, saida: { disjuntor: disjuntorDe(corpo.disjuntor) } }
        : { entrada, erro: corpo.codigo },
    );
  }
  return casos;
}

async function gerarEletroduto() {
  const casos = [];
  for (const entrada of eletroduto) {
    const { ok, corpo } = await post('/dimensionar/eletrodutos', {
      secaoNominalCabo: decimal(entrada.secaoNominalCondutor),
      quantidadeCondutores: entrada.quantidadeCondutores,
    });
    casos.push(
      ok
        ? {
            entrada,
            saida: {
              eletroduto: eletrodutoDe(corpo.eletroduto),
              diametroCondutorMm: corpo.dadosUtilizadosParaCalculo.diametroCabo,
              diametroMinimoEletrodutoMm:
                corpo.dadosUtilizadosParaCalculo.diametroMinimoCalculado,
            },
          }
        : { entrada, erro: corpo.codigo },
    );
  }
  return casos;
}

for (const [nome, gerar] of [
  ['cabeamento', gerarCabeamento],
  ['disjuntor', gerarDisjuntor],
  ['eletroduto', gerarEletroduto],
]) {
  const casos = await gerar();
  writeFileSync(
    new URL(`${nome}.json`, DESTINO),
    `${JSON.stringify(casos, null, 2)}\n`,
  );
  console.log(`${nome}: ${casos.length} casos`);
}
