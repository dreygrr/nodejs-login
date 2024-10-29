import React, { useEffect, useState } from 'react';
import Navbar from "./../navbar/Navbar";
import Book from "./Book";
import ShelfModal from './ShelfModal';
import BookModal from './BookModal';

import "./dashboard.css";

const Dashboard = () => {
  const [shelves, setShelves] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState('all');
  const [showShelfModal, setShowShelfModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [newShelf, setNewShelf] = useState({ name: '', color: '' });
  const [newBook, setNewBook] = useState({ title: '', color: '', content: '', shelfId: null });
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shelves', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          console.log(data);
          
          setShelves([{ id: 'all', name: 'Todos os meus livros' }, ...data]);
          setLoading(false);
        } else {
          console.error('Erro ao buscar estantes');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shelves/${selectedShelf}/books`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Erro ao buscar livros');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchBooks();
  }, [selectedShelf]);

  useEffect(() => {
    // Função para fechar o modal ao pressionar "Esc"
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showShelfModal) {
          setShowShelfModal(false);
        }
        if (showBookModal) {
          setShowBookModal(false);
        }
      }
    };

    // Adiciona o event listener quando o modal está aberto
    if (showShelfModal || showBookModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Remove o event listener quando o modal é fechado
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showShelfModal, showBookModal]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função para abrir o modal de criação de estante
  const openShelfModal = () => {
    setShowBookModal(false);  // Garante que o modal de Livro seja fechado
    setShowShelfModal(true);  // Abre o modal de Estante
  };

  // Função para abrir o modal de criação de livro
  const openBookModal = () => {
    setShowShelfModal(false);  // Garante que o modal de Estante seja fechado
    setShowBookModal(true);    // Abre o modal de Livro
  };

  const handleCreateShelf = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shelves', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShelf),
      });

      if (response.ok) {
        const createdShelf = await response.json();
        setShelves((prev) => [...prev, createdShelf]);
        setShowShelfModal(false);
        setNewShelf({ name: '', color: '' });
      }
    } catch (error) {
      console.error('Erro ao criar estante:', error);
    }
  };

  const handleCreateBook = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const createdBook = await response.json();
        setBooks((prev) => [...prev, createdBook]);
        setShowBookModal(false);
        setNewBook({ title: '', color: '', content: '', shelfId: null });
      }
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <Navbar />

      {selectedBook ? (
        <Book book={selectedBook} onClose={handleCloseBook} />
      ) : (
        <div className={`panel ${showShelfModal || showBookModal ? 'modal-active' : ''}`}>
          <div className="shelves tab">
            <h3>Estantes</h3>
            <button 
              className="btn create-shelf"
              onClick={openShelfModal}  // Usa a função para abrir o modal de Estante
            >
              <i className="fa-regular fa-plus"/>
              Criar Estante
            </button>

            <ul>
              <li className="shelf">
                <button
                  onClick={() => setSelectedShelf(null)}  // null para selecionar "Todos os livros"
                  className={`shelf-btn ${selectedShelf === null ? 'active' : ''}`}
                  style={{'--shelf-color': '#b0c4de'}}
                >
                  {`Todos os meus livros (${totalBooks})`}  {/* Exibe a quantidade total de livros */}
                </button>
              </li>
              
              {shelves.map((shelf) => (
                <li className="shelf" key={shelf.id}>
                  <button
                    onClick={() => setSelectedShelf(shelf.id)}
                    className={`shelf-btn ${selectedShelf === shelf.id ? 'active' : ''}`}
                    style={{'--shelf-color': `${shelf.color}`}}
                  >
                    {`${shelf.name} (${shelf.bookCount || 0})`}  {/* Exibe a contagem de livros */}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="books tab">
            <h3>Livros</h3>

            <button 
              className="btn create-book"
              onClick={openBookModal}  // Usa a função para abrir o modal de Livro
            >
              <i className="fa-regular fa-plus"/>
              Criar Livro
            </button>

            <ul>
              {books.map((book) => (
                <li
                  key={book.id}
                  className="book"
                  style={{'--book-color': `${book.color}`}}
                  onClick={() => handleBookClick(book)}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          </div>

          <ShelfModal
            show={showShelfModal}
            onClose={() => setShowShelfModal(false)}
            onCreate={handleCreateShelf}
            shelf={newShelf}
            setShelf={setNewShelf}
          />
    
          <BookModal
            show={showBookModal}
            onClose={() => setShowBookModal(false)}
            onCreate={handleCreateBook}
            book={newBook}
            setBook={setNewBook}
            shelves={shelves}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
