import "./Item.css";
import { IoHeartSharp } from "react-icons/io5";
import { PiGooglePlayLogoFill, PiStarHalfFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Item = ({  _id , title, poster, genre, rating }) => {
  return (
    <div data-aos="zoom-in-up" className="card-popular astro ">
      <div className="box-img-popular astro">
        <img src={poster} alt={title} />
        <div className="box-heart-popular astro">
          <IoHeartSharp className="heart-popular astro" />
        </div>
        <div className="box-icon-popular astro">
        <Link to={`/details/${_id}`}>
            <div className="min-icon-popular astro">
              <PiGooglePlayLogoFill className="icon-popular astro" />
            </div>
          </Link>
        </div>
      </div>
      <div className="box-text-popular astro">
        <div className="card-title-popular astro">
          <p>
            {title.length > 15
              ? `${title.slice(0, 15)}...`
              : title || "No title available"}
          </p>
          <div className="box-star-popular astro">
            <PiStarHalfFill className="star-popular astro" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="box-category-popular astro">
          <span className="name astro">
            {genre.length > 20
              ? `${genre.slice(0, 20)}...`
              : genre || "No genre available"}
          </span>
          {/* <span className="dot astro"></span>
              <span className="name astro">Science</span> */}
        </div>
      </div>
    </div>
  );
};

export default Item;
