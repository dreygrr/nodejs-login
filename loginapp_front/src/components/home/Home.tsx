import Navbar from "./../navbar/Navbar";
import SplineExample from "./SplineExample";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <h1>Bem-vindo ao seu site de Livros 3D!</h1>

        <SplineExample />
      </main>
    </div>
  );
};

export default HomePage;
