import Navbar from "./../navbar/Navbar";
import Book from "./Book";
import "./dashboard.css";
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [shelves, setShelves] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState('all');
  const [showShelfModal, setShowShelfModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [newShelf, setNewShelf] = useState({ name: '', color: '' });
  const [newBook, setNewBook] = useState({ title: '', color: '', content: '', shelfId: null });
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true); // Adicione um estado de carregamento

  useEffect(() => {
    // Busca todas as estantes do usuário
    const fetchShelves = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shelves', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setShelves([{ id: 'all', name: 'Todos os meus livros' }, ...data]); // Adiciona "Todos os meus livros" como opção padrão
          setLoading(false); // Dados carregados, remove o estado de loading
        } else {
          console.error('Erro ao buscar estantes');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setLoading(false); // Mesmo em erro, removemos o loading
      }
    };

    fetchShelves();
  }, []);

  useEffect(() => {
    // Busca os livros de acordo com a estante selecionada
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shelves/${selectedShelf}/books`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data); // Define os livros no estado
        } else {
          console.error('Erro ao buscar livros');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchBooks(); // Chama a função ao montar o componente ou ao trocar a estante
  }, [selectedShelf]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função para criar uma nova estante
  const handleCreateShelf = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shelves', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShelf),
      });
      if (response.ok) {
        setShowShelfModal(false);
        setNewShelf({ name: '', color: '' });
        // Atualiza a lista de estantes após criar
        const createdShelf = await response.json(); // Recebe a estante recém-criada
        setShelves((prev) => [...prev, createdShelf]); // Adiciona a nova estante à lista
      }
    } catch (error) {
      console.error('Erro ao criar estante:', error);
    }
  };

  // Função para criar um novo livro
  const handleCreateBook = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
  
      if (response.ok) {
        const createdBook = await response.json(); // Recebe o livro recém-criado
        setBooks((prev) => [...prev, createdBook]); // Adiciona o novo livro à lista
        setShowBookModal(false);
        setNewBook({ title: '', color: '', content: '', shelfId: null });
      }
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Atualiza o estado com o livro selecionado
  };

  const handleCloseBook = () => {
    setSelectedBook(null); // Fecha a viewport do livro e volta para a lista
  };

  return (
    <>
      <Navbar />

      {selectedBook ? (
        <Book book={selectedBook} onClose={handleCloseBook} />
      ) : (
        <div className="panel">
          <div className="shelves tab">
            <h3>Estantes</h3>
            <button 
              className="btn create-shelf"
              onClick={() => setShowShelfModal(true)}
            >
              <i className="fa-regular fa-plus"/>
              Criar Estante
            </button>

            <ul>
              {shelves.map((shelf) => (
                <li className="shelf" key={shelf.id}>
                  <button
                    onClick={() => setSelectedShelf(shelf.id)}
                    className={`shelf-btn ${selectedShelf === shelf.id ? 'active' : ''}`}
                    style={{'--shelf-color': `${shelf.color}`,}}
                  >
                    {shelf.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        <div className="books tab">
          <h3>Livros</h3>

          <button 
            className="btn create-book"
            onClick={() => setShowBookModal(true)}
          >
            <i className="fa-regular fa-plus"/>
            Criar Livro
          </button>

          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                className="book"
                style={{'--book-color': `${book.color}`,}}
                onClick={() => handleBookClick(book)}
              >
                {book.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}

      {/* Modal para criar nova estante */}
      {showShelfModal && (
        <div>
          <h3>Criar Nova Estante</h3>

          <input type="text" placeholder="Nome da Estante" value={newShelf.name} onChange={(e) => setNewShelf({ ...newShelf, name: e.target.value })} />

          {/* <input type="text" placeholder="Cor da Estante" value={newShelf.color} onChange={(e) => setNewShelf({ ...newShelf, color: e.target.value })} /> */}
          <input type="color" placeholder="Cor da Estante" value={newShelf.color} onChange={(e) => setNewShelf({ ...newShelf, color: e.target.value })} />

          <button onClick={handleCreateShelf}>Criar</button>
          <button onClick={() => setShowShelfModal(false)}>Cancelar</button>
        </div>
      )}

      {/* Modal para criar novo livro */}
      {showBookModal && (
        <div>
          <h3>Criar Novo Livro</h3>

          <input type="text" placeholder="Título do Livro" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />

          {/* <input type="text" placeholder="Cor do Livro" value={newBook.color} onChange={(e) => setNewBook({ ...newBook, color: e.target.value })} /> */}
          <input type="color" placeholder="Cor do Livro" name="bookColor" id="bookColorId" 
          value={newBook.color} onChange={(e) => setNewBook({ ...newBook, color: e.target.value})}/>

          <textarea placeholder="Conteúdo" value={newBook.content} onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}></textarea>

          <select onChange={(e) => setNewBook({ ...newBook, shelfId: e.target.value })}>
            <option key="none" value={null}>Nenhuma Estante</option> {/* Adicione uma key "none" */}
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
            ))}
          </select>

          <button onClick={handleCreateBook}>Criar</button>
          <button onClick={() => setShowBookModal(false)}>Cancelar</button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
