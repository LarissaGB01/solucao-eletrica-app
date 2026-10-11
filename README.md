<h1 align="center">Solução Elétrica</h1>
<h4 align="center">Aplicativo para dimensionamento de cabos, disjuntores e eletrodutos segundo a NBR 5410</h4>
<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge" alt="Badge em Desenvolvimento">
  <a href="https://github.com/LarissaGB01/solucao-eletrica-app/actions/workflows/ci.yml"><img src="https://github.com/LarissaGB01/solucao-eletrica-app/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

:woman_technologist: [Larissa Galvão Barcelos](https://github.com/LarissaGB01)

## Índice

- [Contextualização do projeto](#contextualização-do-projeto)
- [O que mudou nesta versão](#o-que-mudou-nesta-versão)
- [Documentação teórica](#documentação-teórica)
- [Rodando o projeto](#rodando-o-projeto)
- [Comandos úteis](#comandos-úteis)
- [Documentação técnica](#documentação-técnica)
- [Fonte das imagens](#fonte-das-imagens)

## Contextualização do projeto

Trabalho de Conclusão de Curso (TCC) apresentado como um dos requisitos para a conclusão do curso de Engenharia Elétrica do UniCEUB – Centro Universitário de Brasília.

**DESENVOLVIMENTO DE APLICATIVO PARA DIMENSIONAMENTO DE CABOS, DISJUNTOR E ELETRODUTO VERSÃO ANDROID**

Orientador (a): Luciano Henrique Duque

Desenvolvedor (a): Larissa Galvão Barcelos

Maiores informações sobre o contexto do trabalho e o seu objetivo estão disponíveis [aqui](docs/tcc/introducaoTCC.md).

<p align="center">Brasília, 2023</p>

## O que mudou nesta versão

Este repositório é a reescrita do app original ([solucao_eletrica](https://github.com/LarissaGB01/solucao_eletrica)), mantendo o mesmo visual e fluxo:

|            | Versão original (2023)                                                                                              | Esta versão                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Plataforma | Expo + JavaScript                                                                                                   | React Native CLI + TypeScript                     |
| Cálculos   | Backend Java + MySQL via REST ([solucao_eletrica_backend](https://github.com/LarissaGB01/solucao_eletrica_backend)) | No próprio aparelho, **sem internet**             |
| Sistemas   | Android                                                                                                             | Android (iOS planejado)                           |
| Qualidade  | —                                                                                                                   | Arquitetura em camadas, testes automatizados e CI |

> **Estado atual:** os cálculos ainda retornam valores fixos (mock). O motor de cálculo da NBR 5410 será portado do backend Java na Fase 5 do [roadmap](PLAN.md).

## Documentação teórica

A lógica utilizada para a realização dos cálculos e um exemplo de utilização foram documentados [neste pdf](docs/tcc/passo_a_passo.pdf).

O dimensionamento de condutores é feito com base no cálculo da seção mínima do condutor. Todos os cálculos são baseados na norma NBR 5410 e nas teorias sobre dimensionamento publicadas até 21/09/2023.

Para mais informações sobre as telas e a navegação do aplicativo, acesse [este link](docs/tcc/demonstrativoApp.md).

## Rodando o projeto

### Pré-requisitos

- Node 22 (veja `.nvmrc`)
- JDK 17 (Zulu recomendado)
- Android Studio com Android SDK e um emulador ou aparelho com depuração USB

Guia oficial do ambiente: [React Native – Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment).

### Passos

```bash
npm install          # também gera os assets offline do KaTeX
npm start            # inicia o Metro (deixe rodando)
npm run android      # em outro terminal: compila e instala no emulador/aparelho
```

Não é necessário Expo Go nem configurar API: o app funciona totalmente offline.

> **Android 17:** se o app mostrar "Unable to load script", rode `adb reverse tcp:8081 tcp:8081` e abra o app novamente.

## Comandos úteis

| Comando             | O que faz                                              |
| ------------------- | ------------------------------------------------------ |
| `npm test`          | Roda os testes (Jest)                                  |
| `npm run lint`      | ESLint, incluindo as regras de camadas                 |
| `npm run typecheck` | Verificação de tipos (TypeScript)                      |
| `npm run validate`  | Tudo acima + formatação + cobertura (o mesmo que a CI) |

## Documentação técnica

- [ARCHITECTURE.md](ARCHITECTURE.md): camadas, fluxo de dados e regras de dependência
- [PLAN.md](PLAN.md): roadmap por fases com critérios de aceite
- [docs/adr](docs/adr): decisões de arquitetura (ADRs)
- [CLAUDE.md](CLAUDE.md): convenções e regras do projeto

## Fonte das imagens

- As imagens deste projeto foram geradas via [Dream.ai](https://dream.ai/create).
