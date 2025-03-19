import Carousel from "../../Components/Carousel/Carousel";
import Friend from "../../Components/Friend/Friend";
import Popular from "../../Components/Popular/Popular";
import Watching from "../../Components/Watching/Watching";
import "./Home.css";
const Home = () => {
  return (
    <div className="home astro">
      <div className="box-left astro">
        <Carousel />
        <Popular />
      </div>
      <div className="box-right astro">
        <Watching />
        <Friend />
        
      </div>
    </div>
  );
};

export default Home;
