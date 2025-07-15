# 🚀 CourseSphere: Plataforma de Gestão de Cursos

O projeto consiste em uma aplicação front-end para gerenciamento colaborativo de cursos e aulas, permitindo que múltiplos instrutores interajam de forma intuitiva e eficiente.

---

## ✨ Funcionalidades Implementadas

O CourseSphere foi construído com foco na experiência do usuário e na qualidade do código, implementando as seguintes funcionalidades:

* **Autenticação de Usuários:** Sistema de login seguro para proteger o acesso à plataforma.
* **Dashboard Intuitivo:** Exibição dos cursos em que o usuário está associado como criador ou instrutor.
* **CRUD Completo de Cursos:**
    * **Criação:** Formulário para adicionar novos cursos.
    * **Leitura:** Visualização dos detalhes de cada curso.
    * **Atualização:** Edição das informações de um curso (restrito ao criador).
    * **Exclusão:** Remoção de cursos (restrito ao criador).
* **CRUD Completo de Aulas:**
    * Criação, edição e exclusão de aulas dentro de um curso.
    * Controle de permissão: Apenas o criador da aula ou do curso pode editar/excluir.
* **Gerenciamento de Instrutores:**
    * O criador do curso pode adicionar e remover instrutores colaboradores.
    * Sugestão de novos instrutores através do consumo de uma API externa (`https://randomuser.me`).
* **Busca, Filtros e Paginação:** Na listagem de aulas, é possível buscar por título, filtrar por status e os resultados são paginados.
* **Validação de Formulários:** Validações robustas e em tempo real nos formulários de criação/edição, utilizando Zod e React Hook Form.
* **Feedbacks Visuais:** A interface fornece feedbacks claros para ações do usuário, como carregamento (loading), sucesso e erro, utilizando `react-hot-toast`.
* **Design Responsivo:** Interface agradável e totalmente funcional em dispositivos móveis, tablets e desktops.

---

## 🛠️ Tecnologias e Arquitetura

Este projeto foi desenvolvido utilizando um monorepo com duas pastas principais: `frontend` e `backend`.

### Tecnologias Frontend

* **Framework:** [Next.js](https://nextjs.org/) (com App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Gerenciamento de Estado de UI:** [SWR](https://swr.vercel.app/) para data-fetching e cache.
* **Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para validação de schemas.
* **Gerenciamento de Estado Global:** React Context API para o estado de autenticação.
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Notificações:** [React Hot Toast](https://react-hot-toast.com/)

#### Arquitetura Front-end

A estrutura de componentes segue a metodologia **Atomic Design**, promovendo a máxima reutilização e organização do código. A estrutura de pastas é a seguinte:
* `src/components/atoms`: Componentes básicos e indivisíveis.
* `src/components/molecules`: Combinações de átomos.
* `src/components/organisms`: Seções complexas da UI.
* `src/components/templates`: Estruturas de layout de página.

### Backend

Para focar nas habilidades de front-end, foi utilizado um mock de API local.

* **Servidor:** [JSON Server](https://github.com/typicode/json-server) para simular uma API RESTful completa de forma rápida e eficiente.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [pnpm](https://pnpm.io/installation) (gerenciador de pacotes)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/luizacavalcantee/CourseSphere
    cd CourseSphere
    ```

2.  **Inicie o Backend:**
    Abra um terminal, navegue até a pasta do backend, instale as dependências e inicie o servidor.
    ```bash
    cd backend
    pnpm install
    pnpm start
    ```
    O servidor da API estará rodando em `http://localhost:3001`.

3.  **Inicie o Frontend:**
    Abra um **novo terminal**, navegue até a pasta do frontend, instale as dependências e inicie a aplicação.
    ```bash
    cd frontend
    pnpm install
    pnpm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

Agora, basta acessar `http://localhost:3000` no seu navegador e utilizar a plataforma!
