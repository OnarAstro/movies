import { Link, useNavigate } from "react-router-dom";

import "./Admin.css";
import { UsersContext } from "../../context/UsersContext";
import { useContext, useEffect } from "react";

const Admin = () => {
  const { role } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <div className="pageLogin astro">
      <div className="box-pageLogin astro">
        <div className="text-pageLogin astro">
          <h3 className="title-one astro">
            How are you, <span>Astvie</span>?
          </h3>
          <h3 className="title-two astro">
            <span>Do</span> you want control?
          </h3>
          <p className="astro">
            Control in an easy and efficient way with maximum validity
            <span>.</span>
          </p>
        </div>
        <div className="btn-pageLogin astro">
          <div className="btn-login astro">
            <Link to="/page-movie">
              <button>Movies</button>
            </Link>
          </div>
          <div className="btn-signup astro">
            <Link to="/page-user">
              <button>Users</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
