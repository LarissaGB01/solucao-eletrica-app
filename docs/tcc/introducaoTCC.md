> Texto original do TCC (2023), mantido como registro histórico. A arquitetura descrita (backend Java + MySQL + Expo) foi substituída nesta reescrita por um app React Native + TypeScript que calcula offline — ver [ARCHITECTURE.md](../../ARCHITECTURE.md).

# Desenvolvimento de Aplicativo para Dimensionamento de Cabos, Disjunto e Eletroduto Versão Android

## Indice

- [1. Resummo](#resumo)
- [2. Introdução](#introdução)
- [3. Base Bibliográfica](#documentação-teórica)

## Resumo

Este artigo tem como objetivo o desenvolvimento de um aplicativo mobile destinado a dispositivos Android que efetua os cálculos de dimensionamento de cabos, disjuntores e eletrodutos com base nos dados do circuito fornecido. Para esse fim, a construção desse software envolverá a utilização de banco de dados, serviços backend e aplicações frontend.

Dessa forma, para o armazenamento de tabelas provenientes da norma NBR5410 será utilizado o banco de dados MySQL para que se torne possível, através de uma aplicação backend desenvolvida em Java, realizar o consumo dessas informações. A partir disso, as mesmas serão aplicadas em equações que resultarão nos valores recomendados para a seção do condutor, a corrente do disjuntor e o diâmetro dos eletrodutos, informações essas que serão disponibilizadas via endpoints REST para a aplicação frontend.

Por fim, com esses resultados disponíveis, o aplicativo frontend, desenvolvido utilizando a plataforma React Native em conjunto com o Expo e linguagem JavaScript, é capaz de orquestrar a jornada do usuário, incluindo a inicialização do aplicativo, a coleta das informações necessárias para a realização dos cálculos, a chamada dos endpoints para a realização dos mesmos e a apresentação dos resultados por meio de uma interface intuitiva para o usuário.

## Introdução

Uma instalação elétrica, para ser considerada tecnicamente satisfatória, deve apresentar características que satisfaçam às exigências funcionais necessárias ao ambiente, possuir uma vida útil compatível com a da edificação e de outras utilidades, e ter um custo de instalação, manutenção e consumo de energia que seja economicamente viável, bem como atender às condições necessárias de segurança e conforto (NERY, 2019). Dessa forma, engenheiros eletricistas precisam, diariamente, realizar cálculos e conferências em tabelas normativas para o melhor resultado no projeto em que estão inseridos.

Para isso, existem normas bem conhecidas que guiam o processo de cálculo e decisão da melhor alternativa para determinado circuito elétrico. Como exemplo, a NBR 5410 tem por objetivo estabelecer as condições a que devem satisfazer as instalações elétricas de baixa tensão, a fim de garantir a segurança de pessoas e animais, o funcionamento adequando da instalação e a conservação dos bens (NBR 5410, 2004).

Assim sendo, para alcançarmos tais normativos, equações matemáticas foram desenvolvidas e aperfeiçoadas ao longo dos anos, dando maior credibilidade ao projeto a partir de resultados mais eficientes em circuitos elétricos. Isso pode ser visto ao se analisar a mudança ao longo dos anos na forma de se realizar o processo de instalação e nos materiais utilizados para realizar o mesmo. Tais avanços foram progressivamente documentados nas normas acima mencionadas para que atualmente possamos usufruir dos benefícios gerados por esses estudos.

Por outro lado, dispositivos, softwares ou aplicativos, podem ser utilizados para auxílio nesse processo pois geram maior rapidez de entrega ao mesmo tempo que possuem maior porcentagem de acerto numérico. Isso porque, em casos como esse, o erro humano é um fator inevitável em cálculos e inferências manuais.

De certo, a utilização da tecnologia tem se tornado a cada ano mais presente na sociedade atual. Em decorrência desse processo de digitalização mundial, diversas profissões já foram designadas como obsoletas, fazendo com que se torne necessário para se manter ativo no mercado de trabalho dominar tais conhecimento ou mesmo utilizar deles como forma auxiliar e para aprimoramento de atividades profissionais.

Assim sendo, aplicativos desenvolvidos para celulares podem e tem contribuído com o dia a dia profissional de diversos trabalhadores. A computação móvel enfocada, sobretudo, em smartphones é uma das principais áreas no mercado de desenvolvimento de softwares em geral. Hoje, muitos serviços on-line (que antes eram acessíveis apenas via páginas Web) estão disponíveis por meio de aplicativos, os quais crescem a cada dia, desde entretenimento ao controle financeiro e investimentos (SIMAS, 2019).

Porém, para que uma aplicação mobile opere de forma satisfatória sem onerar muito o desenvolvimento, é comumente utilizado em conjunto com esse programa, aplicações backend e bancos de dados para armazenamento de informações necessárias para o aplicativo.

Em vista disso, um banco de dados é um conjunto de dados com um significado implícito, construído e povoado com dados que tem um determinado objetivo, com usuários e aplicações desenvolvidas para manipulá-los (ALVES, 2014). A manipulação mencionada é normalmente realizada via serviço backend, projetado para realizar o acesso a tais dados, a interpretação dos mesmos, a manipulação para atingir informações válidas para o usuário e, por fim, a disponibilização desse conteúdo para diversos consumidores como por exemplo, uma aplicação mobile.

Contudo, além de necessitar do conhecimento nas plataformas e softwares mencionados, também se torna imprescindível o conhecimento em linguagens de programação como Java, JavaScript, SQL dentre outras. Isso porque é a partir dele que as características especificas de cada linguagem podem ser identificadas, permitindo que programas de qualidade sejam desenvolvidos (MELO, 2003).

Mediante o exposto, o objetivo geral deste artigo é desenvolver um aplicativo que auxilie engenheiros eletricistas no dimensionamento de condutores, disjuntores e eletrodutos seguindo as equações elétricas definidas para tais processos e as normas brasileiras apresentadas pela NBR 5410.
Dessa forma, será desenvolvido um aplicativo mobile para ser publicado via Play Store que poderá auxiliar profissionais da área com a realização de determinados cálculos elétricos.

Esse processo será feito inicialmente através do armazenamento de tabelas normativas presentes na NBR 5410 em um banco de dados. Além disso, será desenvolvida uma aplicação backend na linguagem Java que disponibilizará endpoints para a realização dos cálculos necessários. Para a execução dos mesmos serão requisitados certos dados do sistema elétrico e das informações armazenadas no banco de dados. Vale mencionar que o acesso e recuperação desses dados serão realizados utilizando a linguagem SQL. Por fim, a aplicação frontend desenvolvida em JavaScript será responsável por estetizar o aplicativo, tornando-o intuitivo para o usuário, coletando as informações necessárias e disponibilizando o resultado dos cálculos realizados.

Portanto, conclui-se que tal aplicativo trará avanços em eficiência e digitalização do cotidiano dos profissionais eletricistas, visto que adiantará o processo de realização de cálculos necessários para a definição de determinados elementos elétricos.

## Base Bibliográfica

- NERY, Norberto. Instalações Elétricas – Princípios e Aplicações. 3. ed. São Paulo: Érica, 2019. 400 p. ISBN 978-85-365-3008-6.
- ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 5410: Instalações elétricas de baixa tensão. Rio de Janeiro: ABNT, 2004.
- SIMAS, Victor L.; BORGES, Olimar T.; COUTO, Júlia M C.; et al. Desenvolvimento para dispositivos móveis - Volume 2. Porto Alegre: Grupo A, 2019. E-book. ISBN 9788595029774. Disponível em: https://integrada.minhabiblioteca.com.br/#/books/9788595029774/. Acesso em: 04 ago. 2023.
- ALVES, William P. Banco de dados. 1. ed. São Paulo: Editora Saraiva, 2014. ISBN 9788536518961.
- MELO, Ana Cristina Vieira de. Princípios de linguagem de programação. São Paulo: Editora Blucher, 2003. ISBN 9788521214922.
