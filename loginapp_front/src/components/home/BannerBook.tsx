import Spline from '@splinetool/react-spline';

function SplineExample() {
  const onLoad = (splineApp) => {
    splineApp.setVariable('texto', 'Texto atualizado via React');
  };

  return (
    <div>
      <Spline
        scene="https://prod.spline.design/sb3n4Xg99fIVG-D0/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}

export default SplineExample;