# Teste técnico Livon - FRONTEND

Este projeto é a interface de usuário (client-side) para o sistema de gerenciamento de conteúdos, construído com Nuxt e focado em interatividade e performance.

## Como Rodar o Projeto

Existem duas maneiras de executar a aplicação: via Docker (recomendado para um ambiente integrado) ou localmente para fins de desenvolvimento e depuração.

### 1. Com Docker (Frontend e Backend Separados)

Devido à configuração de ambientes Docker independentes para o frontend e o backend, é necessário subir cada serviço a partir de seu respectivo diretório. Certifique-se de que o backend já esteja em execução para que o frontend possa se comunicar corretamente.

**Iniciar o Frontend:**
  *   Navegue até o diretório raiz deste projeto frontend (onde está o `docker-compose.yaml` deste frontend).
  *   Execute o comando para subir o serviço Docker do frontend:

  ```
  docker compose up -d --build
  ```

4.  A aplicação frontend estará disponível em: **[http://172.20.0.2/:3000](http://172.20.0.2/:3000)**.


### 2. Localmente (Apenas Frontend)

Esta opção é ideal para desenvolver e depurar componentes do frontend de forma isolada.

1.  Instale as dependências do projeto:
```
npm install
```
2.  Execute o servidor de desenvolvimento:
  ```
  npm run dev
  ```
3.  A aplicação estará disponível em: **[http://localhost:3000](http://localhost:3000)**.

## Funcionalidades Visuais Entregues

A aplicação conta com as seguintes telas e componentes:

1.  **Tela de Login:** Formulário para autenticação de usuários. Acesso necessário para visualizar e gerenciar conteúdos.
2.  **Modal de criação** Ao clicar em "criar conteúdo" na página de posts, um modal aparecerá com um formulário para preenchimento de título e descrição
4.  **Favoritos:** Funcionalidade para marcar e desmarcar posts como favoritos, salvando a preferência do usuário.

## Configuração

### Variáveis de Ambiente

A aplicação utiliza uma variável de ambiente para definir a URL base da API. Essa configuração é feita no arquivo `nuxt.config.ts`.

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/' // URL da API backend
    }
  }
})
```

Se o backend estiver rodando em uma porta ou endereço diferente, ajuste o valor de `apiBase`.

## Guia de Uso

1.  **Login:** Acesse **[http://localhost:3000/login](http://localhost:3000/login)** e utilize as credenciais de usuário para entrar no sistema.
2.  **Criar um Post:** Após o login, na página principal, haverá um botão para criar um novo post. Preencha o formulário e salve.
3.  **Filtrar "Minhas Postagens":** Na tela de listagem, ative o filtro "Meus Posts" para ver apenas os posts que você criou.

## Acesso

-   **URL Padrão da Aplicação:** [http://localhost:3000](http://localhost:3000)
-   **Página de Login:** [http://localhost:3000/login](http://localhost:3000/login)