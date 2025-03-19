import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    year: "",
    rating: "",
    genre: "",
    poster: "",
    videosURL: [],
    images: [],
    desc: "",
    category: [],
  });

  

  // جلب جميع الأفلام من API عند تحميل الصفحة
  useEffect(() => {
    axios
      // .get("http://localhost:5000/api/movies")
      .get(`${API_URL}/api/movies`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // إضافة فيلم جديد
  const addMovie = (newMovie) => {
    console.log("🚀 Sending movie data:", newMovie);
  
    axios
      .post(`${API_URL}/api/movies`, newMovie)
      .then((response) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie._id ===  response.data._id ? response.data : movie))
        );
        alert("Movie added successfully!");        
      })
      .catch((error) => {
        console.error("❌ Error adding movie:", error.response?.data || error);
        alert("There was an error adding the movie. Please try again.");
      });
  };
  
  
  

  // ///////////////////////////////////////

  // دالة لتعديل فيلم
  // const updateMovie = (id) => {
  //   axios
  //     .put(`http://localhost:5000/api/movies/${id}`, newMovie)
  //     .then((response) => {
  //       setMovies(
  //         movies.map((movie) => (movie._id === id ? response.data : movie))
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating movie:", error);
  //     });
  // };

  const updateMovie = (id) => {
    // إعداد الكائن الجديد لتحديثه
    const updatedData = {};

    // تحقق من الحقول المعدلة وأضفها إلى الكائن
    if (newMovie.title) updatedData.title = newMovie.title;
    if (newMovie.director) updatedData.director = newMovie.director;
    if (newMovie.year) updatedData.year = newMovie.year;

    // تحقق من قيمة Rating للتأكد من أنها ضمن النطاق 0-10
    if (typeof newMovie.rating === "number" && newMovie.rating >= 0 && newMovie.rating <= 10) {
      updatedData.rating = newMovie.rating;
    }
    

    if (newMovie.genre) updatedData.genre = newMovie.genre;
    if (newMovie.videosURL.length > 0) updatedData.videosURL = newMovie.videosURL;
    if (newMovie.images.length > 0) updatedData.images = newMovie.images;    
    if (newMovie.poster) updatedData.poster = newMovie.poster;
    if (newMovie.desc) updatedData.desc = newMovie.desc;
    if (newMovie.category) updatedData.category = newMovie.category;

    // إذا كانت هناك تعديلات على البيانات
    if (Object.keys(updatedData).length > 0) {
      axios
        // .put(`http://localhost:5000/api/movies/${id}`, updatedData)
        .put(`${API_URL}/api/movies/${id}`, updatedData)
        .then((response) => {
          setMovies(
            movies.map((movie) => (movie._id === id ? response.data : movie))
          );
        })
        .catch((error) => {
          console.error("Error updating movie:", error);
        });
    } else {
      console.log("No changes detected.");
    }
  };

  // ///////////////////////////////////////////

  // دالة لحذف فيلم
  const deleteMovie = (id) => {
    axios
      // .delete(`http://localhost:5000/api/movies/${id}`)
      .delete(`${API_URL}/api/movies/${id}`)
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };


  // ✅ تحديث البحث عند الكتابة
  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
  
    if (value.length < 2) {
      setResults([]); // مسح النتائج إذا كان البحث قصيرًا
      return;
    }
  
    try {
      // const res = await axios.get(`http://localhost:5000/api/search?query=${value}`);
      const res = await axios.get(`${API_URL}/api/search?query=${value}`);
      // console.log("🔍 نتائج البحث:", res.data); // ✅ تأكد من استلام النتائج
      setResults(res.data);
    } catch (error) {
      console.error("❌ خطأ في البحث:", error);
    }
  };
  

  return (
    <MoviesContext.Provider
      value={{
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        newMovie,
        setNewMovie,
        query,
        handleSearch,
        results,
        setResults,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

