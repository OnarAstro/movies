import { FaPlus } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import { PiGooglePlayLogoFill } from "react-icons/pi";

import "./Carousel.css";
import { MoviesContext } from "../../context/MoviesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { movies } = useContext(MoviesContext); // جلب قائمة الأفلام

  const selectedMovie = movies.find(
    (movie) => movie._id === "67d188b41f81e032681702e2"
    // (movie) => movie.title === "Joker"
  ); // اختيار الفيلم حسب العنوان

  if (!selectedMovie) {
    return (
      <div className="loading-container">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <div className="carousel astro">
      <div className="cont-carousel astro">
        <div className="box-img astro">
          <img src={selectedMovie.images} alt={selectedMovie.title} />
        </div>
        <div className="box-carousel astro">
          <div className="top-cont astro">
            <div className="left-box astro">
              <div className="left-row">
                <p>Hot Movie Now</p>
              </div>
              <div className="right-row">
                <p>{selectedMovie.genre}</p>
                <p>{selectedMovie.category}</p>
              </div>
            </div>
            <div className="right-box astro">
              <div className="box-heart">
                <IoHeartSharp className="heart astro" />
              </div>
            </div>
          </div>
          <div className="box-center astro">
            <Link to={`/details/${selectedMovie._id}`}>
              <button>
                Watch Trailer <GoArrowRight className="icon-arrow" />
              </button>
            </Link>
          </div>
          <div className="box-bottom astro">
            <div className="box-btn">
              <Link to={`/details/${selectedMovie._id}`}>
                <button>
                  Watch Now <PiGooglePlayLogoFill className="play" />
                </button>
              </Link>
            </div>
            <div className="box-text astro">
              <p>{selectedMovie.title.slice(0, 40)}</p>
              <span className="astro">
                {selectedMovie.desc.length <= 100
                  ? selectedMovie.desc
                  : `${selectedMovie.desc.slice(0, 100)}... `}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
