import React from 'react';

const ShelfModal = ({ show, onClose, onCreate, shelf, setShelf }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <button className='rightcorner-btn' onClick={onClose}><i className="fa-solid fa-times"/></button>
      <h3>New shelf</h3>
      <div className="field">
        <label htmlFor="shelfname_id">Name</label>
        <input
          id='shelfname_id'
          type="text"
          value={shelf.name}
          onChange={(e) => setShelf({ ...shelf, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="shelfcolor_id">Color</label>
        <input
          type="color"
          placeholder="Cor da Estante"
          value={shelf.color}
          onChange={(e) => setShelf({ ...shelf, color: e.target.value })}
        />
      </div>
      <button className='btn' onClick={onCreate}>Criar</button>
    </div>
  );
};

export default ShelfModal;
