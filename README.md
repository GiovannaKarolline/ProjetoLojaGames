<div align="center">
  <img src="src/assets/hero.jpg" alt="Banner NexGames" width="100%" style="border-radius: 12px; margin-bottom: 20px" />
  
  # 🎮 NexGames — E-Commerce Frontend
  
  **O seu portal definitivo para o universo gamer.** <br>
  Uma aplicação frontend completa de e-commerce, com uma estética gamer premium e responsiva.
  
  <br>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
</div>

<br>

## 🚀 Sobre o Projeto

Frontend de um e-commerce de games desenvolvido como Single Page Application (SPA). A aplicação consome uma API REST para autenticação e gerenciamento completo de categorias e produtos. O estado do usuário é gerenciado via `AuthContext` e as regras de negócio e cálculo do carrinho de compras ocorrem de forma fluida via `CartContext` local.

> 🎨 **Design Refresh:** O sistema possui uma identidade visual única voltada ao mundo gamer. Utilizando a paleta de cores roxo escuro (`violet-950`) com destaques em âmbar (`amber-500`), combinada com os ícones *Phosphor Icons* e componentes interativos.

---

## ✨ Funcionalidades

- 🔒 **Sistema de Autenticação:** Cadastro e login de usuários (validação de idade mínima).
- 🏷️ **Gestão de Categorias:** Listagem, criação, edição e exclusão de categorias de jogos.
- 🕹️ **Gestão de Produtos:** CRUD completo de produtos, associados diretamente às categorias.
- 🛒 **Carrinho de Compras Interativo:** 
  - Contador na Navbar em tempo real.
  - Adição, remoção e controle de quantidade de itens (+ / -).
  - Cálculo instantâneo de subtotais e valor final.
- 📱 **Interface Responsiva:** Design adaptativo (Mobile-First) garantindo usabilidade em qualquer dispositivo.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Requisições HTTP:** [Axios](https://axios-http.com/)
- **Gerenciamento de Estado:** Context API nativa
- **Ícones e UI:** [Phosphor Icons](https://phosphoricons.com/), React Spinners, React Number Format
- **Formatador:** [Prettier](https://prettier.io/) / [ESLint](https://eslint.org/)

---

## 🔌 Integração com a API

A aplicação consome a API RESTful hospedada gratuitamente no Render:

> 🔗 **Base URL:** `https://lojagames-3nay.onrender.com`

| Método | Endpoint | Descrição | Autenticação |
| :---: | --- | --- | :---: |
| `POST` | `/usuarios/cadastrar` | Cria um novo usuário | ❌ |
| `POST` | `/usuarios/logar` | Autentica e retorna o Token | ❌ |
| `GET` | `/categorias` | Retorna o catálogo de categorias | ✔️ |
| `GET` | `/produtos` | Retorna o catálogo de produtos | ✔️ |
| `POST` | `/produtos` / `/categorias` | Cadastra novos itens | ✔️ |
| `PUT` | `/produtos` / `/categorias` | Atualiza os dados | ✔️ |
| `DELETE` | `/produtos/:id` / `/categorias/:id`| Exclui do catálogo | ✔️ |

*⚠️ **Aviso:** Como a API está na camada free do Render, a primeira requisição (Cold Start) pode demorar até 50 segundos para responder.*

---

## 🚦 Rotas da Aplicação

| Rota | Componente Renderizado | Descrição |
| --- | --- | --- |
| `/` | `Login` | Tela inicial de acesso |
| `/cadastro` | `Cadastro` | Tela para registrar nova conta |
| `/home` | `Home` | Vitrine principal |
| `/perfil` | `Perfil` | Perfil do usuário logado |
| `/produtos` | `ListaProdutos` | Catálogo de games |
| `/categorias` | `ListarCategorias` | Catálogo de gêneros e tipos |
| `/carrinho` | `Cart` | Finalização de compras |

*(Rotas de CRUD dinâmicas: `/cadastrarproduto`, `/editarproduto/:id`, etc)*

---

## ⚙️ Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- NPM ou Yarn

```bash
# 1. Clone o repositório
git clone https://github.com/GiovannaKarolline/ProjetoLojaGames.git

# 2. Acesse a pasta do projeto
cd ProjetoLojaGames

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```
Acesse no seu navegador: `http://localhost:5173`

---

## 🌐 Deploy na Vercel

Este projeto já está pré-configurado para Continuous Deployment (CD) através da Vercel. 

**Configurações Especiais Aplicadas:**
1. **`vercel.json`:** Adicionado arquivo de reescrita (`rewrites`) para garantir que o roteamento do `react-router-dom` funcione perfeitamente sem erros `404` ao recarregar as páginas (SPA routing).
2. **Variáveis de Ambiente:** No painel da Vercel, certifique-se de adicionar a chave `VITE_API_URL` apontando para a sua API.

---

## 📂 Arquitetura de Pastas

```text
src/
├── assets/         # Imagens estáticas (backgrounds, hero)
├── components/     # Componentes encapsulados por domínio (produtos, carrinho, etc)
├── contexts/       # Regras globais (AuthContext, CartContext)
├── models/         # Tipagens TypeScript (Interfaces)
├── pages/          # Páginas e roteamento pai
├── services/       # Instância do Axios e API calls
├── App.tsx         # Árvore do projeto (Provider -> Router -> Components)
└── main.tsx        # Ponto de entrada do React
```

---

<div align="center">
  <p>Feito com 💜 para os amantes de tecnologia e games.</p>
  <i>Projeto acadêmico desenvolvido durante o programa Generation Brasil.</i>
</div>
