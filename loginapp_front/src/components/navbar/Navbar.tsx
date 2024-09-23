import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verificar sessão ao montar o componente
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/session', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data.user); // Atualiza o estado com os dados do usuário
        }
      } catch (error) {
        console.log('Usuário não está logado');
        setUser(null); // Define o estado como null se o usuário não estiver logado
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setUser(null); // Remove o usuário do estado
      navigate('/signin'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao deslogar');
    }
  };

  return (
    <nav>
      <h1>3dlib</h1>

      {user ? (
        <>
          <span>Bem-vindo, {user.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <a href="/signin">Login</a>
          <a href="/signup">Cadastro</a>
        </>
      )}
    </nav>
  );
};

export default Navbar;
