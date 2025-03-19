import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UsersContext";
import { PiGameControllerFill } from "react-icons/pi";

const ViewUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token, role } = useContext(UsersContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "admin") {
      navigate("/");
      return;
    }
  }, [token, role, navigate]);

  // تصفية المستخدمين حسب البحث
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/user/all`, {
        headers: { "auth-token": token },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        throw new Error(data.error || "فشل في جلب البيانات");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p className="loading">جاري تحميل البيانات...</p>;


  return (
    <div className="update-movie">
      <div className="box-update">
        <div className="box-img">
          <img
            src="https://images2.alphacoders.com/130/1300732.jpg"
            width={200}
            alt="Movie Cover"
          />
          <div className="box-text">
            <h1>View User</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Link to="/control-user" className="btn-add">
              <PiGameControllerFill />
            </Link>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-update-movie"
        />
        <div className="box-card">
          <div className="box-title">
            <p>Name</p>
            <p>Photo</p>
            <p>Email</p>
            <p>Role</p>
            <p>Comment</p>{" "}
          </div>
          {filteredUsers.map((user) => (
            <div className="box-info" key={user._id}>
              {error && <p className="error">{error}</p>}
              <p>{user.name.slice(0, 15)}</p>
              <p>
                  <img
                    src={user.photo ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt={user.name}
                    width={100}
                    height={50}
                    className="avatar"
                    onError={(e) =>
                      (e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                    }
                  />
              </p>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <p> {user.comment || "No comment"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
