import { BiSolidLock } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";
import { HiMiniPhoto } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UsersContext";

const Signup = () => {
  const { signup, token } = useContext(UsersContext);
  const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signup(
        formData.username,
        formData.email,
        formData.password,
        formData.photo || undefined
      );
      navigate("/"); // ✅ الانتقال إلى الصفحة الرئيسية بعد التسجيل بنجاح
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login astro">
      <div className="box-login astro">
        <div className="title-login astro">
          <h3 className="astro">
            Signup<span className="astro"></span>
          </h3>
          {error && <p className="text-red-500">{error}</p>}
          <p>
            Get New Account<span className="astro">.</span>
          </p>
        </div>
        <div className="box-input-login astro">
          <div className="min-box">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              type="text"
              placeholder="User name"
            />
            <FaUserCircle className="icon" />
          </div>
          <div className="min-box">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="Email Address"
            />
            <MdEmail className="icon" />
          </div>
          <div className="min-box">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              placeholder="Password"
            />
            <BiSolidLock className="icon" />
          </div>
          <div className="min-box">
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              type="text"
              placeholder="link photo (optional)"
            />
            <HiMiniPhoto className="icon" />
          </div>
        </div>
        <div className="btn-login astro">
          <button disabled={loading} onClick={handleSubmit}>
            {loading ? "Loading..." : "Signup"}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
