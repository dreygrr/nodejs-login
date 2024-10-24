import Spline from '@splinetool/react-spline';
import { useEffect, useRef, useState } from 'react';

export default function Book({ book, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false); // Controla se o Spline foi carregado
  const splineAppRef = useRef(null);

  useEffect(() => {
    if (isLoaded && splineAppRef.current && book) {
      // Aguarda o carregamento completo e a existência das variáveis
      const text1Var = splineAppRef.current.getVariable('text1');
      const titleVar = splineAppRef.current.getVariable('title');

      if (text1Var !== undefined) {
        splineAppRef.current.setVariable('text1', book.content || '');
      } else {
        console.warn('A variável "text1" não foi encontrada no Spline.');
      }

      if (titleVar !== undefined) {
        splineAppRef.current.setVariable('title', book.title || '');
      } else {
        console.warn('A variável "title" não foi encontrada no Spline.');
      }
    }
  }, [isLoaded, book]);

  const onLoad = (splineApp) => {
    splineAppRef.current = splineApp;

    // Aguarda um curto intervalo para garantir que as variáveis estejam disponíveis
    setTimeout(() => {
      setIsLoaded(true);
      console.log('Spline carregado com sucesso!', book);
    }, 500); // Pequeno atraso de 500ms para garantir que a cena esteja totalmente carregada
  };

  const saveBook = () => {
    const updatedText1 = splineAppRef.current.getVariable('text1');
    const updatedText2 = splineAppRef.current.getVariable('text2');

    alert(`Salvar conteúdo: ${updatedText1} ${updatedText2}`);
    // @todo - Salvar o conteúdo atualizado no banco de dados
  };

  return (
    <div className='book-view'>
      <Spline
        scene="https://prod.spline.design/VCKMEE8rLn44oGiO/scene.splinecode"
        onLoad={onLoad}
      />

      <button
        onClick={saveBook}
        className='btn btn-save'
        type="button"
      >
        <i className="fa-solid fa-cloud-arrow-up"></i>
        save
      </button>

      {/* Botão para fechar e voltar à lista de livros */}
      <button
        onClick={onClose}
        className='btn btn-close'
        type="button"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Voltar
      </button>
    </div>
  );
}
