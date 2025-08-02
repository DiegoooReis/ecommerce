const express = require("express");
const router = express.Router();
const prisma = require("../db");
const jwt = require("jsonwebtoken");

    router.post("/", async (req, res) => {
        // Verificar se o body existe e tem os campos necessários
        if (!req.body || !req.body.email || !req.body.senha) {
            return res.status(400).json({ 
                error: "Dados inválidos. Email e senha são obrigatórios.",
                received: req.body 
            });
        }

        const { email, senha } = req.body;
        
        try {
            const usuario = await prisma.User.findUnique({
                where: { email }
            });

            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            
            if (usuario.password !== senha) {
                return res.status(401).json({ error: "Senha incorreta" });
            }

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email }, 
                "vai corinthians", 
                { expiresIn: 18000 }
            );

            res.json({ mensagem: "Login realizado com sucesso", token });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    });
    module.exports = router;