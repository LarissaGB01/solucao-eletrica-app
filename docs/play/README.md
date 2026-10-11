# Publicação no Google Play

Tudo o que a ficha da loja precisa está nesta pasta. Passos na ordem:

## 1. Chave de upload (uma vez só)

Na pasta `android/`, gere a chave e guarde o arquivo e as senhas em local seguro (gerenciador de
senhas + backup). Sem ela não é possível publicar atualizações.

```sh
cd android
keytool -genkeypair -v -storetype PKCS12 -keystore upload-keystore.jks \
  -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

Crie `android/keystore.properties` (já está no `.gitignore`):

```properties
storeFile=../upload-keystore.jks
storePassword=SUA_SENHA
keyAlias=upload
keyPassword=SUA_SENHA
```

`storeFile` é relativo a `android/app/`.

## 2. Gerar o pacote

```sh
npm run android:bundle
```

Saída: `android/app/build/outputs/bundle/release/app-release.aab`. Sem `keystore.properties` o
pacote sai assinado com a chave de debug e o Play o recusa (proteção contra envio acidental).

## 3. Play Console

1. **Ficha principal da loja:** textos de `ficha-da-loja.md`, ícone, gráfico e capturas desta pasta.
2. **Conteúdo do app:** respostas abaixo.
3. **Testes > Teste fechado:** crie a faixa, adicione os 12+ testadores (lista de e-mails),
   envie o `.aab` e compartilhe o link de participação. Os testadores precisam ficar inscritos
   por **14 dias seguidos** antes de liberar a produção (contas pessoais novas).
4. Depois dos 14 dias: **Solicitar acesso à produção**, responder o questionário e publicar.

## Respostas para "Conteúdo do app"

| Formulário                                | Resposta                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Política de privacidade                   | `https://github.com/LarissaGB01/solucao-eletrica-app/blob/main/docs/play/politica-de-privacidade.md`                                                   |
| Anúncios                                  | Não contém anúncios                                                                                                                                    |
| Acesso ao app                             | Todas as funcionalidades sem restrição (sem login)                                                                                                     |
| Classificação de conteúdo                 | Categoria "Utilitário/Produtividade/Educação"; responder "Não" a violência, sexo, linguagem, drogas, jogos de azar, interação entre usuários e compras |
| Público-alvo                              | 18 anos ou mais (não direcionado a crianças)                                                                                                           |
| Segurança dos dados                       | Não coleta nem compartilha dados; sem criptografia em trânsito porque não há tráfego de rede                                                           |
| Apps governamentais / financeiros / saúde | Não                                                                                                                                                    |

## Atualizações

Aumente `versionName` em `android/app/build.gradle` e gere com `VERSION_CODE=<número maior> npm run android:bundle`
(o Play exige `versionCode` crescente). A Fase 7 do `PLAN.md` automatiza isso no CI.

## Imagens

Regenerar ícones e gráfico: `python3 scripts/gerar-icones.py` (requer Pillow).
