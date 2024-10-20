import Spline from '@splinetool/react-spline';
import { useRef, useState } from 'react';

export default function Book() {
  const [bookState] = useState('baseState');
  const splineAppRef = useRef(null);

  const onLoad = (splineApp) => {
    splineAppRef.current = splineApp;

    const book = splineApp.findObjectByName('book');

    console.log(book);
    console.log(bookState);
  };

  return (
    <>
      <Spline
        scene="https://prod.spline.design/VCKMEE8rLn44oGiO/scene.splinecode"
        onLoad={onLoad}
      />
    </>
  );
}
