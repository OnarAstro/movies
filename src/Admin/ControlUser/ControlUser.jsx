import InputAddUs from "../../Components/InputAddUs/InputAddUs";
import { Link, useNavigate } from "react-router-dom";
import { MdCheck, MdDelete, MdEdit, MdSave } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UsersContext";
import { HiUsers } from "react-icons/hi2";

const ControlUser = () => {
  const { token, role } = useContext(UsersContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    comment: "",
    role: "user",
  });

  // التأكد من أن المستخدم أدمن، وإلا يتم توجيهه للصفحة الرئيسية
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/all", {
          headers: { "auth-token": token },
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          throw new Error(data.error || "❌ فشل في جلب البيانات");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, role, navigate]);

  // تصفية المستخدمين حسب البحث
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // حذف المستخدم
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ هل أنت متأكد من حذف هذا المستخدم؟")) return;

    try {
      const res = await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: "DELETE",
        headers: { "auth-token": token },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
        alert("✅ تم حذف المستخدم بنجاح!");
      } else {
        throw new Error(data.error || "❌ فشل في حذف المستخدم");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // بدء تعديل المستخدم
  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo || "",
      comment: user.comment || "",
      role: user.role || "user",
    });
  };

  // حفظ التعديلات
  const [savingUserId, setSavingUserId] = useState(null); // لمتابعة حالة الحفظ لكل مستخدم

  // حفظ التعديلات
  const handleUpdate = async () => {
    setSavingUserId(editingUser._id); // تحديد المستخدم الذي يتم حفظ بياناته حاليًا
    try {
      const res = await fetch(
        `http://localhost:5000/user/update/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        setUsers(
          users.map((u) =>
            u._id === editingUser._id ? { ...u, ...formData } : u
          )
        );
        alert("✅ تم تحديث البيانات بنجاح!");

        // إبقاء أيقونة ✅ لمدة 2 ثانية قبل إلغاء التعديل
        setTimeout(() => {
          setEditingUser(null);
          setSavingUserId(null);
        }, 2000);
      } else {
        throw new Error(data.error || "❌ فشل في تحديث المستخدم");
      }
    } catch (error) {
      alert(error.message);
      setSavingUserId(null);
    }
  };

  if (loading) return <p>جاري تحميل البيانات...</p>;
  if (error) return <p style={{ color: "red" }}>❌ حدث خطأ: {error}</p>;

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
            <h1>Control User</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Link to="/view-user" className="btn-add">
              <HiUsers />
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
            <p>Comment</p>
            <p>Edit</p>
          </div>
          {filteredUsers.map((user) => (
            <div className="box-info" key={user._id}>
              <p>{user.name.slice(0, 15)}</p>
              <p>
                <img
                  src={
                    user.photo
                      ? user.photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={user.name}
                  width={100}
                  height={50}
                  className="avatar"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/100x50")
                  }
                />
              </p>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <p> {user.comment.slice(0, 15) || "No comment"}</p>
              <p>
                <div className="box-edit">
                  <button onClick={() => startEdit(user)} className="edit">
                    {savingUserId === user._id ? (
                      <MdCheck />
                    ) : editingUser?._id === user._id ? (
                      <MdSave />
                    ) : (
                      <MdEdit />
                    )}{" "}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete"
                  >
                    <MdDelete />
                  </button>
                </div>
              </p>
            </div>
          ))}
        </div>
        {editingUser && (
          <div className="box-input">
            <InputAddUs
              formData={formData}
              setFormData={setFormData}
              handleUpdate={handleUpdate}
              setEditingUser={setEditingUser}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlUser;
