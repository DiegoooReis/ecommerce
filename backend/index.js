// Importa o framework Express
const express = require('express');

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor vai rodar
const port = 3000;

// Middleware para entender JSON no corpo das requisições
app.use(express.json());

// Rota GET para o caminho "/"
app.get('/', (req, res) => {
  res.send('Back-end funcionando!');
});

// Faz o servidor "ouvir" a porta definida e mostrar mensagem no console
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
