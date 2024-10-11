import Navbar from "./../navbar/Navbar";
import Banner from "./Banner";
// import SplineExample from "./SplineExample";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <h1>write and manage your libraries in 3 dimensions</h1>

        {/* <SplineExample /> */}

        <Banner />
      </main>
    </div>
  );
};

export default HomePage;
