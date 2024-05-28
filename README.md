# Documentação do Frontend do Projeto de Gestão de Faturas

Este documento fornece uma visão geral do frontend do projeto de gestão de faturas, incluindo as dependências utilizadas, a estrutura do projeto e as instruções para configurar e rodar a aplicação.

## Tecnologias Utilizadas

- React
- React Router
- Bootstrap
- TailwindCSS
- Chart.js
- Axios
- React Icons
- React Bootstrap
- React Loader Spinner

## Estrutura do Projeto

### Estrutura do Diretório `src`

- `src/App.js`: Componente principal que define as rotas da aplicação.
- `src/components/Navbar.js`: Componente de navegação.
- `src/components/Footer.js`: Componente de rodapé.
- `src/components/Dashboard.js`: Componente do dashboard que exibe os gráficos de consumo de energia e valores monetários.
- `src/components/InvoiceLibrary.js`: Componente que exibe a biblioteca de faturas.
- `src/index.css`: Arquivo de estilos principais.

## Preparação do Ambiente

### Passos Iniciais

1. Instale as dependências do projeto:

   `npm install` 

3. inicie o projeto com: 
  
`npm start`

Estrutura de Componentes
Navbar (src/components/Navbar.js)
Componente responsável pela navegação principal da aplicação.

Footer (src/components/Footer.js)
Componente responsável pelo rodapé da aplicação.

Dashboard (src/components/Dashboard.js)
Componente que exibe os gráficos de consumo de energia elétrica e valores monetários utilizando o react-chartjs-2 e chart.js.

InvoiceLibrary (src/components/InvoiceLibrary.js)
Componente que exibe a biblioteca de faturas, permitindo filtrar as faturas pelo número do cliente e realizar o download e exclusão das mesmas.

Configuração do TailwindCSS
O TailwindCSS é utilizado para estilização de componentes. Certifique-se de que o tailwindcss está configurado corretamente no seu projeto.
