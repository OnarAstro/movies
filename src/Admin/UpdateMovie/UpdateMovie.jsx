import React, { useContext, useEffect, useState } from "react";
import InputAddMo from "../../Components/InputAddMo/InputAddMo";
import { Link, useNavigate } from "react-router-dom";
import "./UpdateMovie.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { UsersContext } from "../../context/UsersContext";
import { MoviesContext } from "../../context/MoviesContext";
import { TiStarHalfOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";

const UpdateMovie = () => {
  const { movies, updateMovie, deleteMovie, newMovie, setNewMovie } =
    useContext(MoviesContext);
  const { role } = useContext(UsersContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [editingMovieId, setEditingMovieId] = useState(null);

  // ✅ توجيه المستخدم العادي للصفحة الرئيسية
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  // ✅ تحسين البحث باستخدام `useEffect` لمنع إعادة التصفية مع كل حرف
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 300); // تأخير البحث لمنع الضغط على الأداء

    return () => clearTimeout(timeout);
  }, [searchQuery, movies]);

  // ✅ تحسين `handleEdit` لمنع تعديل الكائن الأصلي
  const handleEdit = (movieId) => {
    setEditingMovieId(movieId);
    const movieToEdit = movies.find((movie) => movie._id === movieId);
    setNewMovie({ ...movieToEdit }); // نسخة جديدة لمنع التعديل المباشر على الكائن الأصلي
  };

  // ✅ إصلاح `handleUpdate`
  const handleUpdate = async (movieId) => {
    await updateMovie(movieId); // انتظار التحديث قبل المتابعة
    alert("تم التحديث بنجاح!");
    setEditingMovieId(null);
    setNewMovie({
      title: "",
      director: "",
      year: "",
      rating: "",
      genre: "",
      videosURL: [],
      images: [],
      poster: "",
      desc: "",
      category: [],
    });
  };

  // ✅ تحسين `deleteMovie` لمنع الأخطاء
  const handleDelete = async (movieId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا الفيلم؟"
    );
    if (confirmDelete) {
      await deleteMovie(movieId);
    }
  };

  return (
    <div className="update-movie">
      <div className="box-update">
        <div className="box-img">
          <img
            src="https://images2.alphacoders.com/130/1300732.jpg"
            width={200}
            alt="Movie Poster"
          />
          <div className="box-text">
            <h1>Update Movie</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Link to="/add-movie" className="btn-add">
              <IoAddOutline />
            </Link>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-update-movie"
        />

        <div className="box-card">
          <div className="box-title">
            <p>Title</p>
            <p>Poster</p>
            <p>Year</p>
            <p>Rating</p>
            <p>Edit</p>
          </div>

          {filteredMovies.map((movie) => (
            <div className="box-info" key={movie._id}>
              <p>{movie.title.slice(0, 15)}</p>
              <p>
                <img
                  src={
                    movie.poster ||
                    (movie.images.length > 0 ? movie.images[0] : "")
                  }
                  width={50}
                  alt={movie.title}
                />
              </p>
              <p>{movie.year}</p>
              <p>
                <TiStarHalfOutline /> {movie.rating}
              </p>
              <p>
                <div className="box-edit">
                  <button
                    onClick={() => handleEdit(movie._id)}
                    className="edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="delete"
                  >
                    <MdDelete />
                  </button>
                </div>
              </p>
            </div>
          ))}
        </div>

        {editingMovieId && (
          <div className="box-input">
            <InputAddMo
              newMovie={newMovie}
              setNewMovie={setNewMovie}
              handleUpdate={() => handleUpdate(editingMovieId)}
              handleEdit={handleEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateMovie;
