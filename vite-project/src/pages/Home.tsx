import Footer from "../components/Footer";
import Navbar from "../components/Header";
import ResultsSection from "./Article";
import Cards from "./Cards";
import Overview from "./overview";

const Home = () => {
  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div className="mt-20">
        <Overview />{" "}
      </div>
      <div>
        <Cards />{" "}
      </div>
      <div>
        <ResultsSection />{" "}
      </div>
      <div><Footer /> </div>
    </div>
  );
};

export default Home;