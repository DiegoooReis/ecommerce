const express = require('express');
const cors = require("./middlewares/cors");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);


app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use((error, req, res, next) =>{
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      error: "Cadastro ainda não realizado!",
      message: "Cadastra-se e tente novamente"
    })
  }
})

app.get('/', (req, res) => {
  res.send('Back-end funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
