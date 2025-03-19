import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import SettingUser from "./Components/SettingUser/SettingUser";
import Category from "./Pages/Category/Category";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PageLogin from "./Pages/PageLogin/PageLogin";
import Details from "./Pages/Details/Details";
import Admin from "./Pages/Admin/Admin";
import PageUser from "./Pages/PageUser/PageUser";
import PageMovie from "./Pages/PageMovie/PageMovie";
import AddMovie from "./Admin/AddMovie/AddMovie";
import UpdateMovie from "./Admin/UpdateMovie/UpdateMovie";
import ControlUser from "./Admin/ControlUser/ControlUser";
import ViewUser from "./Admin/ViewUser/ViewUser";

const App = () => {
  return (
    <div className="app">
      <div className="app-box">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<SettingUser />} />
        {/* <Route path="/category" element={<Category />} /> */}
        <Route path="/category/:category" element={<Category />} />
        <Route path="/login-page" element={<PageLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:_id" element={<Details />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/page-user" element={<PageUser />} />
        <Route path="/page-movie" element={<PageMovie />} />

        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/update-movie" element={<UpdateMovie />} />
        
        <Route path="/view-user" element={<ViewUser />} />
        <Route path="/control-user" element={<ControlUser />} />

      </Routes> 
      <Footer />
    </div>
  );
};

export default App;
