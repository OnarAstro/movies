import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesContext";
import { UsersContext } from "../../context/UsersContext";

import "./AddMovie.css";
import { IoAddOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const AddMovie = () => {
  const { addMovie, movies } = useContext(MoviesContext);
  const { role } = useContext(UsersContext);
  const navigate = useNavigate();

  const selectedMovie = movies.find(
    (movie) => movie._id === "67d188b41f81e032681702e2"
    // (movie) => movie.title === "Joker"
  ); // اختيار الفيلم حسب العنوان

  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    desc: "",
    year: "",
    rating: "",
    genre: "",
    category: [],
    images: [],
    poster: "",
    videosURL: [],
  });

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // التعامل مع القيم التي تكون عبارة عن مصفوفات (مثل الفيديوهات والصور)
    if (name.startsWith("videosURL")) {
      const index = name === "videosURL[0]" ? 0 : 1;
      setNewMovie((prev) => {
        const updatedVideos = [...prev.videosURL];
        updatedVideos[index] = value;
        return { ...prev, videosURL: updatedVideos };
      });
    } else if (name.startsWith("images")) {
      const index = name === "images[0]" ? 0 : 1;
      setNewMovie((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = value;
        return { ...prev, images: updatedImages };
      });
    } else if (name === "category") {
      setNewMovie({
        ...newMovie,
        category: value.split(",").map((cat) => cat.trim()), // تحويل النص إلى مصفوفة
      });
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  };
  

  const handleSelectChange = (e) => {
    setNewMovie({
      ...newMovie,
      category: Array.from(e.target.selectedOptions, (option) => option.value),
    });
  };

  const handleSubmit = () => {
    if (!newMovie.title || !newMovie.director || !newMovie.year) {
      alert("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }
    addMovie(newMovie);
    navigate("/");
  };
  

  return (
    <div className="inputAddMo add-movie astro">
      <div className="box-img">
        <img
          // src="https://images2.alphacoders.com/130/1300732.jpg"
          src={
            selectedMovie && selectedMovie.poster
              ? selectedMovie.poster
              : "https://images2.alphacoders.com/130/1300732.jpg"
          }
          
          width={200}
          alt=""
        />
        <div className="box-text">
          <h1>Add Movie</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <Link to="/update-movie" className="btn-add">
            <MdEdit />
          </Link>
        </div>
      </div>
      <div className="form-inputAddMo astro">
        <div className="box-inputAddMo-three astro">
          <div className="min-box astro">
            <input
              name="title"
              placeholder="Title"
              type="text"
              value={newMovie.title}
              onChange={handleChange}
            />
          </div>
          <div className="min-box">
            <input
              name="director"
              placeholder="Director"
              type="text"
              value={newMovie.director}
              onChange={handleChange}
            />
          </div>
          <div className="min-box">
            <input
              name="desc"
              placeholder="Description"
              type="text"
              value={newMovie.desc}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newMovie.year}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              min="0"
              max="10"
              value={newMovie.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              name="category"
              placeholder="Category (comma-separated)"
              value={newMovie.category.join(", ")}
              onChange={handleChange}
            />
          </div>
          <div className="min-box">
            <select
              multiple
              name="category"
              value={newMovie.category}
              onChange={handleSelectChange}
              className="update-input"
            >
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="drama">Drama</option>
              <option value="adventure">Adventure</option>
              <option value="animation">Animation</option>
              <option value="crime">Crime</option>
              <option value="documentary">Documentary</option>
              <option value="family">Family</option>
              <option value="history">History</option>
            </select>
          </div>
        </div>

        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              type="text"
              name="videosURL[0]"
              placeholder="Movie URL"
              value={newMovie?.videosURL[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="text"
              name="poster"
              placeholder="Poster URL"
              value={newMovie.poster}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              type="text"
              name="images[0]"
              placeholder="Image 1 URL"
              value={newMovie?.images[0] || ""}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              type="text"
              name="images[1]"
              placeholder="Image 2 URL"
              min="0"
              max="10"
              value={newMovie?.images[1] || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="text"
              name="videosURL[1]"
              placeholder="Movie 2 URL"
              value={newMovie?.videosURL[1] }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-button">
          <button onClick={handleSubmit} className="update">
            Add
            <IoAddOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
