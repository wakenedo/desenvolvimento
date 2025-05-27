// server.js
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/alunos", async (req, res) => {
  try {
    const { nome_completo, usuario_acesso, senha, email_aluno, observacao } =
      req.body;

    if (!nome_completo || !usuario_acesso || !senha || !email_aluno) {
      return res
        .status(400)
        .json({ mensagem: "Preencha todos os campos obrigatórios." });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    await pool.execute(
      `INSERT INTO alunos (nome_completo, usuario_acesso, senha_hash, email_aluno, observacao)
       VALUES (?, ?, ?, ?, ?)`,
      [nome_completo, usuario_acesso, senha_hash, email_aluno, observacao]
    );

    res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ mensagem: "Usuário ou e-mail já cadastrado." });
    }
    res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
