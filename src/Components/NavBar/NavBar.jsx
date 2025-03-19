import { useContext, useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RiSettings3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import Slider from "../Slider/Slider";
import { MoviesContext } from "../../context/MoviesContext";

import "./NavBar.css";
import { UsersContext } from "../../context/UsersContext";
import { GiArmoredBoomerang } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa";
import Theme from "../../Pages/theme/Theme";

const NavBar = () => {
  const { user, logout, role } = useContext(UsersContext);

  const [isOpen, setIsOpen] = useState(false);
  const { query, results, setResults, handleSearch } =
    useContext(MoviesContext);
  const dropdownRef = useRef(null);

  // ✅ إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-con">
      <div className="nav-bar">
        {/* 🔍 شريط البحث */}
        <div className="nav-box">
          <div className="search-bar">
            <input
              value={query}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setResults([]), 200)} // يغلق القائمة بعد التأخير لتفادي الإغلاق عند النقر
              type="search"
              placeholder="Search..."
            />
            <button>
              <IoSearchOutline className="search-icon" />
            </button>

            {results.length > 0 && (
              <div className="search-results">
                <ul className="search-dropdown">
                  {results.map((movie) => (
                    <Link
                      className="li"
                      to={`/details/${movie._id}`}
                      key={movie._id}
                      onClick={() => setResults([])}
                    >
                      {/* ✅ إخفاء القائمة عند النقر */}
                      <li className="search-item">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="search-img"
                          width={50}
                        />
                        <span>{movie.title.slice(0, 10)}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 🌟 روابط الأقسام */}
        <div className="nav-box none">
          <Link
            to="/"
            className={location.pathname === "/" ? "active link" : "link"}
          >
            Movie
          </Link>
        </div>
        <div className="nav-box none">
          <Link
            to={"/category/animation"}
            className={
              location.pathname === "/category/animation"
                ? "active link"
                : "link"
            }
          >
            Animation
          </Link>
        </div>
        <div className="nav-box none">
          <Link
            to={"/category/series"}
            className={
              location.pathname === "/category/series" ? "active link" : "link"
            }
          >
            Series
          </Link>
        </div>
        <div className="nav-box none">
          <Link
            to="/category/all"
            className={
              location.pathname === "/category/all" ? "active link" : "link"
            }
          >
            More
          </Link>
        </div>
        <div className="nav-box none">
          <Link
            to="/profile"
            className={
              location.pathname === "/profile" ? "active link" : "link"
            }
          >
            <RiSettings3Fill
              className={
                location.pathname === "/profile"
                  ? "active setting-icon"
                  : "setting-icon"
              }
            />
          </Link>
        </div>

        {/* 🟢 القائمة المنسدلة للمستخدم */}
        <div className="nav-box nonetow">
          {user ? (
            <div className="dropdown-profile" ref={dropdownRef}>
              <div className="box-profile" onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={
                    user.photo
                      ? user.photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  // src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt={user.name}
                  className="img-profile"
                />
                <div className="box-text">
                  <p>{user.name}</p>
                  <span>{user.email}</span>
                </div>
                <IoIosArrowDown className={`arrow ${isOpen ? "rotate" : ""}`} />
              </div>

              {/* ✅ القائمة المنسدلة */}
              {isOpen && (
                <ul className="menu-list">
                  <Link
                    to="/profile"
                    className={
                      location.pathname === "/profile" ? "active li" : "li"
                    }
                  >
                    <CgProfile className="icon" /> Profile
                  </Link>
                  {role === "admin" ? (
                    <Link
                      to="/admin"
                      className={
                        location.pathname === "/admin" ? "active li" : "li"
                      }
                    >
                      <GiArmoredBoomerang className="icon " />
                      {/* <FaUserAstronaut className="icon"  /> */}
                      Admin
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link>
                    <Theme />
                  </Link>
                  <Link onClick={logout} className="li">
                    <LuLogOut className="icon" /> Logout
                  </Link>
                </ul>
              )}
            </div>
          ) : (
            <div className="dropdown-profile" ref={dropdownRef}>
              <div className="box-profile" onClick={() => setIsOpen(!isOpen)}>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Unknown User"
                  className="img-profile"
                />
                <div className="box-text">
                  <p>Unknown User</p>
                  <span>Not logged in</span>
                </div>
                <IoIosArrowDown className={`arrow ${isOpen ? "rotate" : ""}`} />
              </div>

              {/* ✅ القائمة المنسدلة */}
              {isOpen && (
                <ul className="menu-list">
                  <Link>
                    <Theme />
                  </Link>
                  <Link
                    to="/login"
                    className={
                      location.pathname === "/login" ? "active li" : "li"
                    }
                  >
                    <CgProfile className="icon" /> Login
                  </Link>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔄 السلايدر */}
      <Slider />
    </div>
  );
};

export default NavBar;
