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
    <form onSubmit={handleRegister}>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Birthdate</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>

      <div className='links'>
        <Link to="/signin">Já tem uma conta? Entre aqui!</Link>
        <Link to="/">Voltar para a home</Link>
      </div>
    </form>
  );
};

export default SignUp;
