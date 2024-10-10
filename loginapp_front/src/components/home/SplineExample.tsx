import Spline from '@splinetool/react-spline';
import { useState, useRef } from 'react';

function SplineExample() {
  const [text, setText] = useState(''); // Estado para armazenar o texto digitado
  const splineAppRef = useRef(null); // Para armazenar a referência ao splineApp

  const onLoad = (splineApp) => {
    splineAppRef.current = splineApp; // Armazena o splineApp na ref
    splineApp.setVariable('texto', text); // Define o texto inicial
  };

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setText(newText); // Atualiza o texto no estado

    // Atualiza o texto no Spline em tempo real
    if (splineAppRef.current) {
      splineAppRef.current.setVariable('texto', newText);
    }
  };

  return (
    <>
      <textarea 
        className='text-content' 
        name="textInput" 
        value={text}
        onChange={handleInputChange} // Evento para capturar mudanças no texto
        placeholder="Digite o texto aqui"
      />

      <Spline
        scene="https://prod.spline.design/sb3n4Xg99fIVG-D0/scene.splinecode"
        onLoad={onLoad}
      />
    </>
  );
}

export default SplineExample;
