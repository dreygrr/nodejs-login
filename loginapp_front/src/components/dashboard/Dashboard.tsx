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
  const [selectedBook, setSelectedBook] = useState(null);
  
  const [showShelfModal, setShowShelfModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  
  const [newShelf, setNewShelf] = useState({ name: '', color: '' });
  const [newBook, setNewBook] = useState({ title: '', color: '', content: '', shelfId: null });
  
  const [loading, setLoading] = useState(true);

  // Função para buscar as estantes
  const fetchShelves = async () => {
    setLoading(true); // Define como carregando antes de buscar
    try {
      const response = await fetch('http://localhost:5000/api/shelves', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setShelves([{ id: 'all', name: `Todos os meus livros (${data.totalBooks})` }, ...data.shelves]);
      } else {
        console.error('Erro ao buscar estantes');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false); // Certifique-se de parar o carregamento após a busca
    }
  };

  // Função para buscar os livros com base na estante selecionada
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

  useEffect(() => {
    fetchShelves();
  }, []);

  useEffect(() => {
    if (selectedShelf) {
      fetchBooks();
    }
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
        await fetchShelves(); // Recarrega as estantes após a criação
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
        await fetchBooks(); // Recarrega os livros após a criação
        await fetchShelves(); // Recarrega as estantes para atualizar a contagem de livros
        setShowBookModal(false);
        setNewBook({ title: '', color: '', content: '', shelfId: null });
      } else {
        console.error('Erro ao criar livro');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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
              {shelves.map((shelf, id) => (
                <li className="shelf" key={shelf.id}>
                  <button
                    onClick={() => setSelectedShelf(shelf.id)}
                    className={`shelf-btn ${selectedShelf === shelf.id ? 'active' : ''}`}
                    style={{'--shelf-color': `${shelf.color}`}}
                  >
                    {
                      id === 0 ? (
                        <span><i className="fa-solid fa-books"/> {shelf.name}</span>
                      ) : (
                        `${shelf.name} (${shelf.bookCount || 0})`
                      )
                    }
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
                  <div className="options">
                    <button className='btn-trash' type="button"><i className="fa-solid fa-trash"/></button>
                    <button className='btn-edit' type="button"><i className="fa-solid fa-pen"/></button>
                  </div>
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
            shelves={shelves.filter((shelf) => shelf.id !== 'all')}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
