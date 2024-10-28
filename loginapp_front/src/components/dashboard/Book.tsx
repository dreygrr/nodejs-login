import Spline from '@splinetool/react-spline';
import { useEffect, useRef, useState } from 'react';

export default function Book({ book, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false); // Controla se o Spline foi carregado
  const splineAppRef = useRef(null);

  useEffect(() => {
    if (isLoaded && splineAppRef.current && book) {

      // Alterar a cor do livro
      const bookFace1 = splineAppRef.current.findObjectByName('face1');
      if (bookFace1) {
        console.log(bookFace1)
        console.log(splineAppRef.current._sharedAssetsManager);

        console.log(splineAppRef.current._sharedAssetsManager.data.colors);
        console.log(splineAppRef.current._sharedAssetsManager.data.materials);
        console.log(splineAppRef.current._sharedAssetsManager.data.variables);

        console.log(splineAppRef.current.getVariables());
        console.log(splineAppRef.current.findObjectByName('Faces'));

        // console.log(splineAppRef.current.getAllObjects());

        
        
        // Verifica se o material existe
        if (bookFace1.material) {
          // Verifica se o material tem a propriedade 'color'
          if (bookFace1.material.color) {
            bookFace1.material.color.set(book.color || '#ffffff'); // Define a cor
          } else {
            console.warn('Propriedade "color" não encontrada no material.');
          }
        } else {
          console.warn('Material do objeto "face1" não encontrado.');
        }
      } else {
        console.warn('Objeto "face1" não encontrado no Spline.');
      }

      // Definir o conteúdo do livro, como texto e título
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
    setTimeout(() => {
      setIsLoaded(true);
      console.log('Spline carregado com sucesso!', book);
    }, 500); // Pequeno atraso para garantir o carregamento
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

      <button onClick={saveBook} className='btn btn-save' type="button">
        <i className="fa-solid fa-cloud-arrow-up"></i>
        save
      </button>

      <button onClick={onClose} className='btn btn-close' type="button">
        <i className="fa-solid fa-arrow-left"></i>
        Voltar
      </button>
    </div>
  );
}
