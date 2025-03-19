import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { UsersProvider } from "./context/UsersContext";
import { MoviesProvider } from "./context/MoviesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <MoviesProvider>
          <App />
        </MoviesProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>
);
