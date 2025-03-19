import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../../Components/Carousel/Carousel";
import Item from "../../Components/Item/Item";

import "./Category.css";
import { useContext, useState } from "react";
import { MoviesContext } from "../../context/MoviesContext";

const Category = () => {
  const { category } = useParams(); // استخراج التصنيف من الـ URL
  const { movies } = useContext(MoviesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // تخزين الفئة المختارة
  const navigate = useNavigate();

  // فلترة الأفلام حسب البحث بالاسم والتصنيف
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === "all" ||
        (Array.isArray(movie.category)
          ? movie.category.includes(category)
          : movie.category === category))
  );

  // استخراج التصنيفات من قائمة الأفلام
  const categories = Array.from(
    new Set(
      movies.flatMap((movie) =>
        Array.isArray(movie.category) ? movie.category : [movie.category]
      )
    )
  );

  // التعامل مع تغيير التصنيف
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue); // تحديث الحالة عند التغيير

    if (selectedValue === "all") {
      navigate(`/category/all`); // الانتقال لصفحة تعرض كل الأفلام
    } else {
      navigate(`/category/${selectedValue}`); // الانتقال لصفحة التصنيف المختار
    }
  };

  // window.scrollTo(0, 0); // تحديث الصفحة إلى الأعلى عند التحميل

  // console.log(movies);

  return (
    <div className="cont-category">
      <Carousel />
      <div className="category astro">
        <div className="box-category astro">
          <div className="title-category astro">
            <h3 className="astro">Movie List</h3>
            <input
              className="search astro"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={selectedCategory} // القيمة المختارة
              onChange={handleCategoryChange}
              className="select astro"
            >
              <option value="all">All</option> {/* إزالة selected */}
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="box-card-category">
            {filteredMovies.length > 0 ? (
              filteredMovies
                // .slice(0, 3)
                .map((movie) => <Item key={movie._id} {...movie} />)
            ) : (
              <div className="loading-container astro">
                <p className="loader"></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
