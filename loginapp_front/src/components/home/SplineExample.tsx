import Spline from '@splinetool/react-spline';
import { useState, useRef } from 'react';

const pages = ['pag1', 'pag2', 'pag3'];

function SplineExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const splineAppRef = useRef(null); // Para armazenar a referência ao splineApp

  const onLoad = (splineApp) => {
    splineAppRef.current = splineApp; // Armazena o splineApp na ref
    splineApp.setVariable('texto', pages[currentPage]); // Define o texto inicial
  };

  const nextPage = () => {
    const nextPageIndex = (currentPage + 1) % pages.length; // Alterna entre as páginas
    setCurrentPage(nextPageIndex);

    // Verifica se o splineApp já foi carregado e atualiza o texto
    if (splineAppRef.current) {
      splineAppRef.current.setVariable('texto', pages[nextPageIndex]);
    }
  };

  return (
    <div>
      <button onClick={nextPage}>Próxima Página</button>
      <Spline
        scene="https://prod.spline.design/sb3n4Xg99fIVG-D0/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}

export default SplineExample;
