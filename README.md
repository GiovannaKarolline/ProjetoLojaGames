# Loja de Games — Frontend

Frontend de um e-commerce de games desenvolvido com React, TypeScript e Tailwind CSS. A aplicação consome uma API REST para autenticação e gerenciamento de categorias e produtos, enquanto o carrinho de compras é controlado localmente pelo estado do React.

## Funcionalidades

- Cadastro e login de usuários.
- Validação de idade mínima de 18 anos no cadastro.
- Listagem, cadastro, edição e exclusão de categorias.
- Listagem, cadastro, edição e exclusão de produtos.
- Associação de produtos às suas respectivas categorias.
- Adição de produtos ao carrinho.
- Contador de itens do carrinho na Navbar.
- Alteração da quantidade de cada produto.
- Remoção de produtos do carrinho.
- Cálculo automático de subtotais e do valor total.
- Layout responsivo para desktop e dispositivos móveis.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Number Format
- React Spinners
- Phosphor Icons
- Day.js

## Integração com a API

A aplicação está configurada para consumir o backend publicado em:

```text
https://lojagames-3nay.onrender.com
```

Principais recursos consumidos:

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/usuarios/cadastrar` | Cadastra um usuário |
| `POST` | `/usuarios/logar` | Autentica um usuário |
| `GET` | `/categorias` | Lista as categorias |
| `GET` | `/categorias/:id` | Busca uma categoria |
| `POST` | `/categorias` | Cadastra uma categoria |
| `PUT` | `/categorias` | Atualiza uma categoria |
| `DELETE` | `/categorias/:id` | Exclui uma categoria |
| `GET` | `/produtos` | Lista os produtos |
| `GET` | `/produtos/:id` | Busca um produto |
| `POST` | `/produtos` | Cadastra um produto |
| `PUT` | `/produtos` | Atualiza um produto |
| `DELETE` | `/produtos/:id` | Exclui um produto |

As operações protegidas enviam o token do usuário no cabeçalho `Authorization`.

> Como o backend está hospedado em um serviço gratuito, a primeira requisição pode levar alguns instantes enquanto o servidor é inicializado.

## Rotas da aplicação

| Rota | Página |
| --- | --- |
| `/` | Login |
| `/cadastro` | Cadastro de usuário |
| `/home` | Página inicial |
| `/perfil` | Perfil do usuário |
| `/categorias` | Listagem de categorias |
| `/cadastrarcategoria` | Cadastro de categoria |
| `/editarcategoria/:id` | Edição de categoria |
| `/deletarcategoria/:id` | Exclusão de categoria |
| `/produtos` | Listagem de produtos |
| `/cadastrarproduto` | Cadastro de produto |
| `/editarproduto/:id` | Edição de produto |
| `/deletarproduto/:id` | Exclusão de produto |
| `/carrinho` | Carrinho de compras |

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.

### Instalação

Clone ou baixe o projeto e, no diretório da aplicação, instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

## Como cadastrar um produto

1. Cadastre um usuário ou faça login.
2. Acesse a página **Produtos** pela Navbar.
3. Clique em **Novo Produto** ou use o botão disponível na Home.
4. Informe nome, preço, URL da imagem e categoria.
5. Clique em **Cadastrar**.

Para cadastrar um produto é necessário que exista pelo menos uma categoria registrada.

## Como utilizar o carrinho

1. Na página **Produtos**, clique em **Comprar**.
2. Abra o carrinho pelo ícone exibido na Navbar.
3. Utilize os botões `+` e `−` para alterar a quantidade.
4. Utilize a lixeira para remover completamente um produto.
5. Confira o subtotal de cada item e o valor total da compra.

O carrinho é um protótipo controlado pela Context API. Seus dados não são enviados ao backend nem persistidos após a aplicação ser recarregada.

## Estrutura principal

```text
src/
├── components/
│   ├── carrinho/
│   ├── categorias/
│   ├── footer/
│   ├── navbar/
│   └── produtos/
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── models/
├── pages/
├── services/
├── App.tsx
└── main.tsx
```

## Scripts disponíveis

```bash
# Executa o projeto em desenvolvimento
npm run dev

# Verifica o código com ESLint
npm run lint

# Gera a versão de produção
npm run build

# Visualiza localmente a versão de produção
npm run preview
```

## Organização do projeto

- `AuthContext`: controla o usuário autenticado durante a execução da aplicação.
- `CartContext`: controla produtos, quantidades e valores do carrinho.
- `Service.ts`: centraliza a comunicação com a API por meio do Axios.
- `models`: contém as interfaces TypeScript utilizadas pela aplicação.
- `components`: reúne os componentes reutilizáveis de produtos, categorias, carrinho, Navbar e Footer.
- `pages`: contém as páginas principais de autenticação, Home e perfil.

---

Projeto acadêmico desenvolvido durante o programa Generation Brasil.
