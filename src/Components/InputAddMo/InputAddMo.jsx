import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import "./InputAddMo.css";

const InputAddMo = ({ newMovie, setNewMovie, handleUpdate, handleEdit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setNewMovie((prev) => {
      if (name === "category") {
        return { ...prev, category: value.split(",").map((cat) => cat.trim()) };
      }
  
      if (name === "rating") {
        return { ...prev, rating: Number(value) }; // تحويل القيمة إلى رقم
      }
  
      if (name === "movieUrl") {
        return { ...prev, videosURL: [value, prev.videosURL?.[1] || ""] };
      }
  
      if (name === "movieUrl2") {
        return { ...prev, videosURL: [prev.videosURL?.[0] || "", value] };
      }
  
      if (name === "image1") {
        return { ...prev, images: [value, prev.images?.[1] || ""] };
      }
  
      if (name === "image2") {
        return { ...prev, images: [prev.images?.[0] || "", value] };
      }
  
      return { ...prev, [name]: value };
    });
  };
  

  return (
    <div className="inputAddMo astro">
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
          {/* <div className="min-box">
            <input
              name="comment"
              placeholder="Comment"
              type="text"
              value={newMovie.comment}
              onChange={handleChange}
            />
          </div> */}
        </div>

        <div className="box-inputAddMo-two astro">
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
          <div className="min-box astro">
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-inputAddMo-three astro">
          <div className="min-box astro">
            <input
              type="text"
              name="movieUrl"
              placeholder="Movie URL"
              value={newMovie.videosURL?.[0] || ""}
              onChange={handleChange}
            />
          </div>
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
              name="image1"
              placeholder="Image 1 URL"
              value={newMovie.images?.[0] || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="text"
              name="image2"
              placeholder="Image 2 URL"
              value={newMovie.images?.[1] || ""}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              name="category"
              placeholder="Category (comma-separated)"
              value={
                Array.isArray(newMovie.category)
                  ? newMovie.category.join(", ")
                  : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="min-box">
            <select
              multiple
              name="category"
              id="category"
              value={Array.isArray(newMovie.category) ? newMovie.category : []}
              onChange={(e) =>
                setNewMovie({
                  ...newMovie,
                  category: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="update-input"
            >
              <option disabled value="">
                Select
              </option>
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
              name="desc"
              placeholder="Description"
              type="text"
              value={newMovie.desc}
              onChange={handleChange}
            />
          </div>
          <div className="min-box astro">
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newMovie.year}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="box-inputAddMo-one astro">
          <div className="min-box astro">
            <input
              type="text"
              name="movieUrl2"
              placeholder="Movie URL 2"
              value={newMovie.videosURL?.[1] || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="box-button">
        <button onClick={handleUpdate} className="update">
          <MdEdit />
        </button>
        <button onClick={() => handleEdit(null)} className="cancel">
          <TbCancel />
        </button>
      </div>
    </div>
  );
};

export default InputAddMo;
