import { Link, useNavigate } from "react-router-dom";

import "./PageLogin.css";
import { UsersContext } from "../../context/UsersContext";
import { useContext, useEffect } from "react";

const PageLogin = () => {
  const { token } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="pageLogin astro">
      <div className="box-pageLogin astro">
        <div className="text-pageLogin astro">
          <h3 className="title-one astro">
            How are you doing with <span>Astvie</span>?
          </h3>
          <h3 className="title-two astro">
            <span>Do</span> you want to login?
          </h3>
          <p className="astro">
            Astvie is the best site that makes it easy for you to watch movies{" "}
            <span>.</span>
          </p>
        </div>
        <div className="btn-pageLogin astro">
          <div className="btn-login astro">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="btn-signup astro">
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
