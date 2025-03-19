import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { GrPlay } from "react-icons/gr";
import { Link } from "react-router-dom";


import "./Footer.css"
import { GiAstronautHelmet } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer-one ">
        <div className="box-icon">
          <GiAstronautHelmet className="icon " />
        </div>
        <div className="footer-social">
          <Link className="a" to="https://www.facebook.com/">
            <FaFacebook className="icon" />
          </Link>
          <Link className="a" to="https://www.instagram.com/">
            <FaInstagram className="icon" />
          </Link>
          <Link className="a" to="https://github.com/">
            <FaGithub className="icon" />
          </Link>
          <Link className="a" to="https://www.linkedin.com/">
            <FaLinkedin className="icon" />
          </Link>
        </div>
      </div>
      <div className="top-footer-two">
        <p>© 2023 Movie View One. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
