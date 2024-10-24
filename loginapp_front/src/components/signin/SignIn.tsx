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
    <div className="default-form-container">
      <form className='default-form' onSubmit={handleLogin}>
        <h3>sign in</h3>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className='field'>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      
        <div className='field'>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className='btn' type="submit">Login</button>

        <ul className='links'>
          <li> Ainda não tem uma conta? <Link to="/signup">Cadastre-se aqui!</Link></li>
          <li>
            <Link to="/">Voltar para a home</Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignIn;
