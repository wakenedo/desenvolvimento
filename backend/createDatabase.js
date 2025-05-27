const mysql = require("mysql2/promise");

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: "serverdbp2.mysql.database.azure.com",
      user: "useradmin",
      password: "admin@123",
    });

    // Criação do banco de dados (se ainda não existir)
    await connection.query(`CREATE DATABASE IF NOT EXISTS alexandre`);

    // Usar o banco e criar a tabela
    await connection.query(`USE alexandre`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS alunos (
        id_aluno INT AUTO_INCREMENT PRIMARY KEY,
        nome_completo VARCHAR(100) NOT NULL,
        usuario_acesso VARCHAR(50) NOT NULL UNIQUE,
        senha_hash VARCHAR(255) NOT NULL,
        email_aluno VARCHAR(100) NOT NULL UNIQUE,
        observacao VARCHAR(255),
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Banco de dados e tabela criados com sucesso!");
    await connection.end();
  } catch (err) {
    console.error("Erro ao criar banco de dados ou tabela:", err);
  }
})();
