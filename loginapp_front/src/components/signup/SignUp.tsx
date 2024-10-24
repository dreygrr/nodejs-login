import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    if (password !== confirmPassword) {
      setError('Senhas não coincidem!');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/register', { username, name, birthdate, password });
        setMessage(response.data.message); // Mensagem de sucesso
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message); // Mensagem de erro vinda do backend
        } else {
          setError('Erro ao se conectar com o servidor');
        }
      }
    }
  };

  return (
    <div className="default-form-container">
      <form className='default-form' onSubmit={handleRegister}>

        <h3>sign up</h3>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className='btn' type="submit">Register</button>

        <ul className='links'>
          <li>Já tem uma conta? <Link to="/signin">Entre aqui!</Link></li>
          <li><Link to="/">Voltar para a home</Link></li>
        </ul>
      </form>
    </div>
  );
};

export default SignUp;
