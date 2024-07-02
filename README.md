Aqui está o README.md atualizado com um resumo sobre o projeto Angular e sua relação com a API em Spring Boot:

# Projeto Angular de Gerenciamento de Contatos

Este projeto Angular consome uma API desenvolvida em Spring Boot para gerenciamento de contatos. Ele permite listar, adicionar, editar e excluir contatos através de uma interface de usuário amigável.

## Resumo

O projeto Angular de Gerenciamento de Contatos oferece uma interface intuitiva para interagir com uma API RESTful em Spring Boot. Ele permite visualizar todos os contatos, filtrar por favoritos, adicionar novos contatos, editar informações existentes e remover contatos da lista. O projeto também suporta marcação de contatos como favoritos, proporcionando uma experiência completa de gerenciamento de contatos.

## Pré-requisitos

- Node.js e npm instalados
- Angular CLI

## Instalação

1. **Clone o repositório:**

   ```
   git clone https://github.com/enzorooschqueiroz/Agenda_Angular.git
   ```

2. **Instale as dependências:**

   ```
   npm install
   ```

## Configuração da API

1. Configure a URL da API Spring Boot:
   
   Abra o arquivo de ambiente (`src/environments/environment.ts`) e configure a `apiUrl` para apontar para a URL da sua API Spring Boot:

   ```typescript
   export const environment = {
       production: false,
       apiUrl: 'http://localhost:8080' // URL da sua API Spring Boot
   };
   ```

## Execução do Projeto Angular

1. **Inicie o servidor de desenvolvimento:**

   ```
   ng s -o
   ```

2. Acesse o aplicativo Angular em: `http://localhost:4200`

## Funcionalidades

- Listar todos os contatos e alternar entre todos e favoritos
- Adicionar, editar e excluir contatos
- Marcar contatos como favoritos

## Estilização

- O projeto utiliza estilização com base no esquema de cores definido no CSS.
  
