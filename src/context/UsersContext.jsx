// context.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("auth-token") || null
  );

  const fetchUser = async (authToken = token) => {
    try {
      // const res = await fetch("http://localhost:5000/user/getuser", {
      const res = await fetch(`${API_URL}/user/getuser`, {
        headers: { "auth-token": authToken },
      });

      // console.log("📡 استجابة السيرفر:", res); // ✅ التحقق من الاستجابة الخام

      const data = await res.json();
      // console.log("📡 البيانات المحوّلة إلى JSON:", data); // ✅ التحقق من البيانات المرسلة من الخادم

      if (data.success && data.user) {
        // console.log("✅ بيانات المستخدم:", data.user);
        setUser(data.user); // ✅ ضبط الكائن بالكامل
      } else {
        console.error("❌ خطأ في جلب بيانات المستخدم:", data.error);
      }
    } catch (error) {
      console.error("❌ خطأ في الاتصال بالخادم:", error);
    }
  };

  const login = async (email, password) => {
    try {
      // const res = await fetch("http://localhost:5000/user/login", {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("auth-token", data.token);
        setToken(data.token);

        // اجلب بيانات المستخدم بعد التحقق من نجاح المصادقة
        await fetchUser(data.token);

        return { success: true };
      } else {
        throw new Error(data.error || "خطأ في تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      return { success: false, error: error.message };
    }
  };

  const signup = async (username, email, password) => {
    try {
      // const res = await fetch("http://localhost:5000/user/signup", {
      const res = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("auth-token", data.token);
        fetchUser();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth-token");
    navigate("/login"); // استخدام navigate
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const updateUser = async (updates) => {
    try {
      // نفترض أن بيانات المستخدم موجودة في user.user.id
      const res = await fetch(
        // `http://localhost:5000/user/update/${user?._id}`,
        `${API_URL}/user/update/${user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(updates),
        }
      );
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, ...data.user });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteUser = async () => {
    try {
      // const res = await fetch(`http://localhost:5000/user/delete/${user._id}`, {
      const res = await fetch(`${API_URL}/user/delete/${user._id}`, {
        method: "DELETE",
        headers: { "auth-token": token },
      });
      const data = await res.json();
      if (data.success) {
        logout();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await fetch("http://localhost:5000/user/public-users");
        const res = await fetch(`${API_URL}/user/public-users`);
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("❌ خطأ في جلب المستخدمين:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        signup,
        logout,
        updateUser,
        deleteUser,
        role: user?.role,
        users,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
