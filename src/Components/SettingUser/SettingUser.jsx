import { GiAstronautHelmet } from "react-icons/gi";

import "./SettingUser.css";
import { RxUpdate } from "react-icons/rx";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import { MdDelete } from "react-icons/md";

const SettingUser = () => {
  const { token, user, setUser, deleteUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    photo: "",
    comment: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // console.log("🔍 التوكن:", token);
    // console.log("👤 بيانات المستخدم:", user);

    if (!token) {
      navigate("/login");
      return;
    }

    if (user && user._id) {
      setFormData({
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo || "",
        comment: user.comment || "",
      });
      setLoading(false);
    }
  }, [token, user, navigate]);

  // تحديث بيانات المستخدم
  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.name.trim()) {
        alert("❌ يجب إدخال اسم المستخدم!");
        return;
      }

      setUpdating(true);
      setError(null);

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        // استخدام meta.env.VITE_API_URLL

        const res = await fetch(`${API_URL}/user/update/${formData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          alert("تم تحديث البيانات بنجاح ✅");
        } else {
          throw new Error(data.error || "فشل في تحديث البيانات");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setUpdating(false);
      }
    },
    [formData, token, setUser]
  );
  // حذف الحساب
  const handleDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      setDeleting(true);
      try {
        await deleteUser();
        alert("تم حذف الحساب بنجاح!");
        navigate("/login");
        window.location.reload();
      } catch (error) {
        console.error("خطأ في حذف الحساب:", error);
      } finally {
        setDeleting(false);
      }
    }
  }, [deleteUser, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <p style={{ color: "red" }}>❌ حدث خطأ: {error}</p>;

  return (
    <div className="setting-user astro">
      <div className="box-setting-user astro">
        <div className="box-photo astro">
          <div className="photo astro">
            <img src={formData.photo} alt={formData.name} width={100} />
            <GiAstronautHelmet className="icon astro" />
          </div>
          <div className="text-photo astro">
            <h3>{formData.name}</h3>
            <p>{formData.email}</p>
          </div>
        </div>
        <div className="box-update astro">
          <div className="title-update astro">
            <h3>Account Setting</h3>
          </div>
          <div className="form-update astro">
            <div className="box-input astro">
              <div className="min-box astro">
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="User name"
                  type="text"
                />
              </div>
              <div className="min-box">
                <input
                  value={formData.email}
                  placeholder="Email"
                  type="email"
                  disabled
                />
              </div>
            </div>
            <div className="box-input astro">
              <div className="min-box astro">
                <input
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  placeholder="Photo"
                  type="text"
                />
              </div>
            </div>
            <div className="box-input astro">
              <div className="min-box astro">
                <input
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Comment"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="box-button">
            <button
              onClick={handleUpdate}
              disabled={updating || deleting}
              className="update"
            >
              {updating ? "Updating..." : <RxUpdate className="update" />}
            </button>
            <button
              onClick={handleDelete}
              disabled={updating || deleting}
              className="cancel"
            >
              {deleting ? (
                "Deleting..."
              ) : (
                <MdDelete className="delete" onClick={handleDelete} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingUser;
