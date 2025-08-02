const express = require("express");
const router = express.Router();
const prisma = require("../db");

router.post("/", async (req, res) => {
  const { name, email, password, dataNascimento } = req.body;

    if (!name || !email || !password || !dataNascimento){
            return res.status(400).json({ error: "Preencha todos os campos obrigatórios!"});
    }
    try {
        const existinguser = await prisma.user.findUnique({ where : { email}});
        if (existinguser) {
            return res.status(400).json({ error: "E-mail já cadastrado"});
        }

        const novousuario = await prisma.user.create({
          data: {
            name,
            email,
            password,
            dataNascimento: new Date(dataNascimento)
          }
        });
    
    res.status(201).json(novousuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

module.exports = router;