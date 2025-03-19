import { PiGooglePlayLogoFill, PiStarHalfFill } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";

import "./Watching.css";
import { MoviesContext } from "../../context/MoviesContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Watching = () => {
  const { movies } = useContext(MoviesContext);
  return (
    <div className="watching astro">
      <div className="box-watching astro">
        <div className="title-watch astro">
          <h3 className="astro">Continue Watching</h3>
          <TbMovie className="icon astro" />
        </div>
        <div className="box-card astro">
          {movies.slice(0, 2).map((movie) => (
            <div key={movie._id} className="card astro">
              <div className="box-img astro">
                <img src={movie.poster} alt={movie.title} />
                <Link to={`/details/${movie._id}`}>
                  <div className="box-icon astro">
                    <PiGooglePlayLogoFill className="icon astro" />
                  </div>
                </Link>
              </div>
              <div className="box-text astro">
                <div className="card-title astro">
                  <h3 className="astro">{movie.title.slice(0, 15)}</h3>
                </div>
                <div className="box-category astro">
                  <span className="name astro">{movie.genre.slice(0, 15)}</span>
                  {/* <span className="dot astro"></span>
                  <span className="name astro">Fantasy</span>
                  <span className="dot astro"></span>
                  <span className="name astro">Pirate</span> */}
                </div>
                <div className="box-time astro">
                  <span className="time astro">
                    {movie.rating} <PiStarHalfFill className="star astro" />
                  </span>
                  <span className="dot astro"></span>
                  <span className="time astro">{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watching;
