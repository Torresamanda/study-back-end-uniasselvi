Resumo das alterações realizadas no projeto:

1 - Atualizado o arquivo db.ts para usar a sintaxe de import/export do ES6. E os tipos importados ajudam a definir corretamente os tipos de retorno das queries executadas no banco de dados MySQL.

2 - Atualizado o arquivo MovieService.ts:

a. Usado a sintaxe de import/export do ES6.

b. Refatorado a função query para usar a biblioteca mysql2/promise e evitar erros de tipagem. A função query serve para simplificar o acesso ao banco de dados e evitar repetição de código. Essa função é genérica e pode ser usada com diferentes tipos de retorno de consulta.

c. Convertido todas as funções do MovieService em funções assíncronas para facilitar o tratamento de consultas ao banco de dados.

3 - Atualizado o arquivo MovieController.ts para:

a. Usado as importações do ES6 em vez de require e module.exports. No caso, foi usado sintaxe de import/export do ES6.

Explicação:
"As importações e exportações do ES6 (também conhecidas como módulos ES) são a sintaxe padrão para importação e exportação no ECMAScript 2015 (ES6) e versões posteriores. Eles oferecem várias vantagens em comparação com a sintaxe CommonJS (usando require e module.exports):
- A sintaxe é mais clara e concisa.
- Os módulos ES são carregados de forma assíncrona, o que pode resultar em melhor desempenho.
- Usar módulos ES no código pode ajudar a garantir a compatibilidade futura e facilitar a colaboração com outros desenvolvedores que possam estar familiarizados com a sintaxe do ES6."

b. Removido a exportação default e adicionado a exportação individual de cada função.

c. Criado uma função de utilidade para lidar com a resposta JSON. A função de utilidade jsonResponse foi adicionada para lidar com respostas JSON e evitar repetição de código.

Explicação:
No controlador, foi criado uma função chamada jsonResponse para lidar com a resposta JSON. Essa função aceita o objeto res (resposta), o objeto json e um código de status HTTP e configura a resposta JSON apropriada.

Isso irá permitir que evite repetir a lógica de resposta JSON em várias funções.
Caso seja necessário fazer alterações na maneira como as respostas JSON são manipuladas, só precisará atualizar a função jsonResponse, em vez de alterar várias instâncias no controlador.

d. A iteração for foi substituída por um método map, o que torna o código mais fácil de ler.

4 - Atualizado o arquivo routes.ts para:

a. Usar a sintaxe de import/export do ES6.

b. Importar o MovieController usando a sintaxe apropriada para importações nomeadas.

5 - Atualizado o arquivo json.models.ts para permitir que o campo result aceite qualquer tipo de valor.
Assim a interface Json poderá definir o tipo de retorno de todas as funções no arquivo MovieController.ts.
O campo result pode ser um array de objetos Movie (como na função 'getAll') ou um único objeto Movie como na (função 'getMovie'), e o TypeScript não lançará erros de tipo.

Ou seja, a atualização permitiu que o código fosse atualizado para usar a sintaxe mais recente do JavaScript (ES6) e TypeScript.
Foi possível também resolver os problemas de tipagem e importação/exportação que estava apresentando.
E as atualizações no MovieService.ts tornaram a função query mais resistente e compatível com a biblioteca mysql2/promise.