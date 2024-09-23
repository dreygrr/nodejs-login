import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { username, password },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      
      if (response.status === 200) {
        navigate('/'); // Redireciona para a homepage
      }
    } catch (error: any) { // Mudança aqui
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Erro ao se conectar com o servidor');
      }
    }
  };
  
  

  return (
    <form onSubmit={handleLogin}>
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
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>

      <div className='links'>
        <Link to="/signup">Ainda não tem uma conta? Cadastre-se aqui!</Link>
        <Link to="/">Voltar para a home</Link>
      </div>
    </form>
  );
};

export default SignIn;
