import Spline from '@splinetool/react-spline';
import { useRef, useState } from 'react';

export default function Book() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const splineAppRef = useRef(null);
  let bookContent = '';

  const onLoad = (splineApp) => {
    splineAppRef.current = splineApp;

    const book = splineApp.findObjectByName('book');
  };

  const saveBook = () => {
    alert(splineAppRef.current.getVariable('text1') + ' ' + splineAppRef.current.getVariable('text2'));
  }

  return (
    <>
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
    </>
  );
}
