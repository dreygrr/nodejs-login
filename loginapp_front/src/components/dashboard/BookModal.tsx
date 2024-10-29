import React from 'react';

const BookModal = ({ show, onClose, onCreate, book, setBook, shelves }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <button className='rightcorner-btn' onClick={onClose}><i className="fa-solid fa-times"/></button>

      <h3>New book</h3>

      <div className="field">
        <label htmlFor="booktitle_id">Title</label>

        <input
          id='booktitle_id'
          type="text"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="bookcolor_id">Color</label>
        <input
          type="color"
          placeholder="Cor do Livro"
          value={book.color}
          onChange={(e) => setBook({ ...book, color: e.target.value })}
        />
      </div>

      <textarea
        placeholder="Conteúdo"
        value={book.content}
        onChange={(e) => setBook({ ...book, content: e.target.value })}
      ></textarea>

      <div className="field">
        <label htmlFor=""></label>
        <select onChange={(e) => setBook({ ...book, shelfId: e.target.value })}>
          <option key="none" value={null}>Nenhuma Estante</option>
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
          ))}
        </select>
      </div>

      <button className='btn' onClick={onCreate}>Criar</button>
    </div>
  );
};

export default BookModal;
