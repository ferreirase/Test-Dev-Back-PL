#### Subindo o servidor
  1. Clone/Baixe este repositório na sua máquina;
  2. Abra o terminal na raiz da pasta do projeto e rode o comando *``` docker-compose up --build ```*  para subir os containers do projeto;
  3. Pronto, seu servidor backend e banco de dados estão no ar e prontos pra serem acessados no endereço "http://localhost:3333" ou na porta setada no arquivo *``` .env ```*.

## Rotas e Parâmetros

#### /token
```
- Verbo: GET
- Rota para gerar um novo token JWT;
- Parâmetros: nenhum;
- Retorno: um objeto com um novo token JWT;
```

#### /parents
```
- Verbo: GET
- Rota para visualizar todas os Pets Parents cadastrados;
- Parâmetros: nenhum;
- Retorno: um array de Pet Parents ou um array vazio;
```

#### /parents
```
- Verbo: POST
- Rota para cadastrar um novo Pet Parent;
- Parâmetros: nenhum;

  body {
    name: string,
    pedigree: boolean,
    age: number
  }

- Retorno: um objeto com os dados do novo Pet Parent cadastrado;
```

#### /parents/:id
```
- Verbo: PUT
- Rota para alterar/atualizar um Pet Parent;
- Parâmetros: id(route param);

  body {
    name?: string,
    pedigree?: boolean,
    age?: number
  }

- Retorno: um objeto com os novos dados do Pet Parent alterado;
```

#### /parents/:id
```
- Verbo: DELETE
- Rota para deletar um Pet Parent e seus Childrens;
- Parâmetros: id(route param);
- Retorno: um objeto com os dados do Pet Parent deletado;
```

#### /childrens
```
- Verbo: GET
- Rota para visualizar todos os Childrens cadastrados;
- Parâmetros: nenhum;
- Retorno: um array com todos os Childrens cadastrados;
```

#### /childrens/parent_id
```
- Verbo: GET
- Rota para visualizar os Childrens de um determinado Pet Parent;
- Parâmetros: parent_id(route param);
- Retorno: um array com os Childrens de um determinado Pet Parent;
```

#### /childrens
```
- Verbo: POST
- Rota para cadastrar um novo Children;
- Parâmetros: nenhum;

  body {
    parent_id: string,
    name: string,
    age: number,
    vaccinated: boolean
  }

- Retorno: um objeto com os dados do novo Children cadastrado;
```

#### /childrens/:id
```
- Verbo: PUT
- Rota para alterar/atualizar um Children;
- Parâmetros: id(route param);

  body {
    parent_id?: string,
    name?: string,
    age?: number,
    vaccinated?: boolean
  }

- Retorno: um objeto com os dados do Children alterado/atualizado;
```

## Tecnologias Utilizadas no Projeto

| **Backend**|
|----------- |
| *NodeJS*   |
| *Express*    |
| *TypeScript* |
| *TypeORM*    |
| *PostgreSQL* |
| *Eslint*     |
| *Prettier*  |
| *Docker*    |
| *JWT*    |
