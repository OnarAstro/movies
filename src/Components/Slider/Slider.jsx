import {
  GiAnimalSkull,
  GiArmoredBoomerang,
  GiAstronautHelmet,
  GiFilmStrip,
} from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";

import "./Slider.css";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import { FaUserAstronaut } from "react-icons/fa";
import Theme from "../../Pages/theme/Theme";

const Slider = () => {
  const { user, logout, role } = useContext(UsersContext);

  return (
    <div className="slider ">
      <div className="box-slider ">
        <div className="box-icon">
          <GiAstronautHelmet className="icon " />
        </div>
      </div>
      <div className="box-slider ">
        <ul className="menu-list ">
          <Link
            to="/"
            className={location.pathname === "/" ? "active li" : "li"}
          >
            <GoHomeFill className="icon " />
          </Link>
          {user ? (
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? "active li" : "li"}
            >
              <RiSettings3Fill className="icon " />
            </Link>
          ) : (
            <></>
          )}
          <Link
            to={"/category/animation"}
            className={
              location.pathname === "/category/animation" ? "active li" : "li"
            }
          >
            <GiAnimalSkull className="icon " />
          </Link>
          <Link>
            <Theme />
          </Link>
          <Link
            to={"/category/series"}
            className={
              location.pathname === "/category/series" ? "active li" : "li"
            }
          >
            <GiFilmStrip className="icon " />
          </Link>
          <Link
            to="/category/all"
            className={
              location.pathname === "/category/all" ? "active li" : "li"
            }
          >
            <MdMoreVert className="icon " />
          </Link>
          {role === "admin" ? (
            <Link
              to="/admin"
              className={location.pathname === "/admin" ? "active li" : "li"}
            >
              <GiArmoredBoomerang className="icon " />
              {/* <FaUserAstronaut className="icon" /> */}
            </Link>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="box-slider">
        {user ? (
          <button className="logout">
            <Link onClick={logout}>
              <LuLogOut className="icon " />
            </Link>
          </button>
        ) : (
          <button
            className={
              location.pathname === "/login-page" ? " login2 active" : "login2"
            }
          >
            <Link to="/login-page">
              <FiLogIn className="icon" />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider;
