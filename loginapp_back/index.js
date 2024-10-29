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



// Rota para buscar os livros de um usuário logado
app.get('/api/books', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }

  const username = req.session.user.username; // Pegando o username do usuário logado
  const query = 'SELECT * FROM books WHERE author = ? ORDER BY title;'; // Usando o username como chave

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar os livros' });
    }

    res.json(results); // Retorna a lista de livros encontrados
  });
});
// Rota para criar um novo livro
app.post('/api/books', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }

  const username = req.session.user.username;
  const { title, color, content, shelfId } = req.body;

  const query = 'INSERT INTO books (title, color, content, author) VALUES (?, ?, ?, ?)';
  db.query(query, [title, color, content, username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar o livro' });
    }

    const bookId = result.insertId;

    // Se o livro for associado a uma estante, insere na tabela intermediária
    if (shelfId) {
      const shelfBookQuery = 'INSERT INTO shelves_books (id_shelf, id_book) VALUES (?, ?)';
      db.query(shelfBookQuery, [shelfId, bookId], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao associar o livro à estante' });
        }

        // res.status(201).json({ message: 'Livro criado e associado à estante com sucesso' });
        res.status(201).json({ id: bookId, title, color, content }); // Retorna o livro criado com o ID
      });
    } else {
      // res.status(201).json({ message: 'Livro criado com sucesso' });
      res.status(201).json({ id: bookId, title, color, content }); // Retorna o livro criado com o ID
    }
  });
});



// Rota para buscar as estantes e a quantidade total de livros
app.get('/api/shelves', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }

  const username = req.session.user.username;

  // Query para buscar estantes e contar os livros por estante
  const shelfQuery = `
    SELECT 
      shelves.id, 
      shelves.name, 
      shelves.color, 
      COUNT(shelves_books.id_book) AS bookCount
    FROM shelves
    LEFT JOIN shelves_books ON shelves.id = shelves_books.id_shelf
    WHERE shelves.author = ?
    GROUP BY shelves.id
    ORDER BY shelves.name;
  `;

  // Query para contar o total de livros do usuário
  const totalBooksQuery = `
    SELECT COUNT(books.id) AS totalBooks 
    FROM books 
    WHERE books.author = ?;
  `;

  db.query(shelfQuery, [username], (err, shelves) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar estantes' });
    }

    // Fazer a segunda query para contar todos os livros
    db.query(totalBooksQuery, [username], (err, totalBooksResult) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao contar livros' });
      }

      const totalBooks = totalBooksResult[0].totalBooks;

      // Retornar as estantes e a contagem total de livros
      res.json({ shelves, totalBooks });
    });
  });
});



// Rota para criar uma nova estante (shelf)
app.post('/api/shelves', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }

  const username = req.session.user.username;
  const { name, color } = req.body;

  const query = 'INSERT INTO shelves (name, color, author) VALUES (?, ?, ?)';
  db.query(query, [name, color, username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar a estante' });
    }

    // res.status(201).json({ message: 'Estante criada com sucesso' });
    res.status(201).json({ id: result.insertId, name, color }); // Retorna a estante criada com o ID
  });
});



// Rota para buscar os livros de uma estante específica ou "Todos os meus livros"
app.get('/api/shelves/:id/books', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Usuário não está logado' });
  }

  const username = req.session.user.username;
  const shelfId = req.params.id;

  let query;
  let params;

  if (shelfId === 'all') {
    // Buscar todos os livros do usuário, independente de estante
    query = 'SELECT * FROM books WHERE author = ? ORDER BY title;';
    params = [username];
  } else {
    // Livros de uma estante específica
    query = `
      SELECT books.* FROM books 
      JOIN shelves_books ON books.id = shelves_books.id_book
      WHERE shelves_books.id_shelf = ? AND books.author = ?
      ORDER BY title;
    `;
    params = [shelfId, username];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar livros da estante' });
    }

    res.json(results); // Retorna os livros encontrados
  });
});




// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
