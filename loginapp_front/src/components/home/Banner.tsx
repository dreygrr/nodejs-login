import Spline from '@splinetool/react-spline';

function Banner() {
  // const onLoad = (splineApp) => {
  //   splineApp.setVariable('texto', 'Texto atualizado via React');
  // };

  return (
    <div>
      <Spline
        scene="https://prod.spline.design/1bgBc-g1IAyopqiX/scene.splinecode"
      />
    </div>
  );
}

export default Banner;