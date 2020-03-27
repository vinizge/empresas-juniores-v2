const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

//Carregando variáveis de ambiente
dotenv.config({path:'./config/config.env'});

//Conectando com o banco de dados
connectDB();

//Arquivos de rota
const users = require('./routes/users');

//Inicialização do framework express
const app = express();

//Retorna e lê apenas requisições e respostas com headers JSON
app.use(express.json());

//Gerenciador de cookies
app.use(cookieParser());

//Middleware de desenvolvimento para melhor visualização de erros
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

//Criação de rotas
app.use('/users', users)

//Adiciona o errorHandler para uso do express
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`Servidor funcionando na porta ${PORT} em modo ${process.env.NODE_ENV}`.yellow.bold));

//Gerencia promessas rejeitadas que não foram tratadas
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Erro: ${err.message}`.red);
  //Fecha o servidor e o processo
  server.close(()=> process.exit(1));
})


