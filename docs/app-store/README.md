# Publicação na App Store

O build já sobe com `npm run ios:release -- upload` (TestFlight). Esta pasta tem o que falta para a
ficha da loja. Os textos longos são os mesmos do Google Play: [ficha-da-loja.md](../play/ficha-da-loja.md).

## 1. TestFlight (você, ~10 min)

1. App Store Connect → **Solução Elétrica** → **TestFlight** → **Testes internos** → **+**.
2. Crie o grupo, adicione seu e-mail e marque o build.
3. No iPhone, instale o app **TestFlight** e aceite o convite.

## 2. Ficha da loja (Distribuição → iOS App 1.0)

| Campo                                                    | Valor                                                                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Capturas de tela (iPhone com Dynamic Island, tela média) | as 5 imagens de `screenshots/` (1206×2622), nesta ordem                                               |
| Texto promocional (até 170)                              | Dimensione cabos, disjuntores e eletrodutos pela NBR 5410, com o passo a passo de cada cálculo.       |
| Descrição                                                | "Descrição completa" de `../play/ficha-da-loja.md`                                                    |
| Palavras-chave (até 100)                                 | `nbr 5410,dimensionamento,cabo,disjuntor,eletroduto,condutor,elétrica,instalação,engenharia,circuito` |
| URL de suporte                                           | `https://github.com/LarissaGB01/solucao-eletrica-app/issues`                                          |
| Copyright                                                | 2026 Larissa Barcelos                                                                                 |
| Build                                                    | o build enviado pelo TestFlight                                                                       |
| Notas para a revisão                                     | O app não tem login nem conexão com a internet. Todos os cálculos são feitos no aparelho.             |
| Contato da revisão                                       | seu nome, telefone e `larissabarcelos.dev@gmail.com`                                                  |
| Liberação da versão                                      | Manual (você decide quando publicar após a aprovação)                                                 |

## 3. Informações do app (menu à esquerda)

| Campo                   | Valor                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subtítulo (até 30)      | Cabos e disjuntores NBR 5410                                                                                                                        |
| Categoria               | Educação (secundária: Utilidades)                                                                                                                   |
| Classificação etária    | responda "Nenhum" / "Não" em tudo → 4+                                                                                                              |
| Privacidade do app      | URL: `https://github.com/LarissaGB01/solucao-eletrica-app/blob/main/docs/play/politica-de-privacidade.md`; coleta de dados: **Não coletamos dados** |
| Preço e disponibilidade | Gratuito; países: todos (ou só Brasil)                                                                                                              |

## 4. Enviar para revisão

Distribuição → **Adicionar para revisão** → **Enviar**. A Apple costuma responder em 1–3 dias.

## Capturas de tela

Geradas pelo fluxo Maestro [capturas.yaml](capturas.yaml) (instruções no topo do arquivo).
