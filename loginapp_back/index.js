require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const port = 5000;

// Configuração CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições apenas do front-end
  credentials: true, // Permite envio de cookies e cabeçalhos de autenticação
}));

app.use(bodyParser.json());

// Configura a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



// Conecta ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});



// Configurar a sessão
app.use(session({
  secret: 'segredoSuperSecreto123', // Substitua por uma string segura
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Para ambiente de desenvolvimento, use secure: true em produção com HTTPS
}));



// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verifica o usuário no banco de dados
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const user = results[0];
    
    // Compara a senha inserida com o hash armazenado no banco de dados
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      if (isMatch) {
        req.session.user = user; // Cria a sessão
        res.status(200).json({ message: 'Login bem-sucedido!' });
      } else {
        res.status(401).json({ message: 'Senha incorreta' });
      }
    });
  });
});



// Rota de registro
app.post('/api/register', (req, res) => {
  const { username, name, birthdate, password } = req.body;

  // Verifica se o usuário já existe
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no servidor' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Gera um hash seguro para a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao gerar hash da senha' });
      }

      // Insere o novo usuário no banco de dados com a senha hasheada
      const insertQuery = 'INSERT INTO users (username, name, birthdate, password) VALUES (?, ?, ?, ?);';
      db.query(insertQuery, [username, name, birthdate, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
        res.json({ message: 'Usuário registrado com sucesso!' });
      });
    });
  });
});



app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ user: req.session.user }); // Retorna os dados do usuário se a sessão existir
  } else {
    res.status(401).json({ message: 'Usuário não está logado' }); // Retorna 401 se não houver sessão
  }
});




app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deslogar' });
    }
    res.json({ message: 'Logout bem-sucedido' });
  });
});



// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
