import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";

import "./Theme.css";

const Theme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);
  return (
    <div className="Theme">
      <button
        onClick={() => {
          // Set value to LS
          localStorage.setItem(
            "currentMode",
            theme === "dark" ? "light" : "dark"
          );

          // get value from LS
          setTheme(localStorage.getItem("currentMode"));
        }}
        className="mode flex"
      >
        {theme === "dark" ? (
          <span className="icon-moon-o">
            <FaMoon className="FaMoon" />
            {/* Dark */}
          </span>
        ) : (
          <span className="icon-sun">
            <IoIosSunny />
            {/* Light */}
          </span>
        )}
      </button>
    </div>
  );
};

export default Theme;
