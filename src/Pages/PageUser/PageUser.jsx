import { Link, useNavigate } from "react-router-dom";

import { UsersContext } from "../../context/UsersContext";
import { useContext, useEffect } from "react";

const PageUser = () => {
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
            Happy Users, <span>Astvie</span>.
          </h3>
          <h3 className="title-two astro">
            <span>Do</span> you want to control or watch?
          </h3>
          <p className="astro">
            Easily control and view users<span>.</span>
          </p>
        </div>
        <div className="btn-pageLogin astro">
          <div className="btn-login astro">
            <Link to="/control-user">
              <button>Control</button>
            </Link>
          </div>
          <div className="btn-signup astro">
            <Link to="/view-user">
              <button>View</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUser;
