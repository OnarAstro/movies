import "./Popular.css";
import Item from "../Item/Item";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext";

const Popular = () => {
  const { movies } = useContext(MoviesContext);

  const limitedMovies = movies
    .sort(() => 0.5 - Math.random()) // خلط العناصر عشوائيًا
    .slice(0, 3); // أخذ أول 3 عناصر بعد الخلط;

  return (
    <div className="popular astro">
      <div className="box-popular astro">
        <div className="title-popular astro">
          <h1>Popular Movie</h1>
          <div className="btn-popular astro">
            <button>
              <Link to="/category/all">Show all</Link>
            </button>
          </div>
        </div>
        <div className="box-card-popular astro">
          {limitedMovies.map((movie) => {
            return <Item key={movie._id} {...movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Popular;
