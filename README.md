## Projeto Trybe Futebol Club

O TFC é um site informativo sobre partidas e classificações de futebol! soccer

Nesse projeto, foi desenvolvido um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou regras de negócio providas no projeto e a API é consumida por um front-end já provido pela Trybe e não foi desenvolvido por mim.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Há um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Foi o ambiente desenvolvido por mim.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;

3️⃣ **Front-end:**
  - O front foi fornecido integralmente pela trybe. A única exceção foi seu Dockerfile que precisou ser configurado.
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints construídos nos requisitos.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db).

</details>

### Tecnologias Utilizadas

O front, back e banco de dados estão conectados em containers do docker.

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, Sequelize, TypeScript, ES6

#### Como rodar a aplicação

Para inicializar os containers, utilizar o comando:

```npm run compose:up
``` 

#### Testes

Durante o desenvolvimento da API foram feitos testes de integração, para verificar esses testes, basta rodar o comando:

```npm test
``` 
Dentro da pasta Backend
