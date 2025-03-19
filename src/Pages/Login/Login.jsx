import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UsersContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login , token } = useContext(UsersContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/", { replace: true });
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      }
    } catch {
      setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login astro">
      <div className="box-login astro">
        <div className="title-login astro">
          <h3 className="astro">
            L<span className="astro"></span>gin
          </h3>
          {error && <p className="error-message">{error}</p>}
          <p>
            Get <span className="astro">login</span> access your account.
          </p>
        </div>
        <div className="box-input-login astro">
          <div className="min-box">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Email Address"
            />
            <MdEmail className="icon" />
          </div>
          <div className="min-box">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <span className="icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="btn-login astro">
          <button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? " Loading..." : "Login"}
          </button>
          <p>
            Don't have an account?
            <Link to="/signup">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
