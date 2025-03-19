import { MdCheck, MdEdit, MdSave } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

import "./InputAddUs.css";
import { useState } from "react";

const InputAddUs = ({
  formData,
  setFormData,
  handleUpdate,
  setEditingUser,
}) => {

  const [saving, setSaving] = useState(false); // حالة جديدة لمتابعة الحفظ

  const handleSave = async () => {
    setSaving(true); // عند الضغط، غيّر الحالة للحفظ
    await handleUpdate(); // تنفيذ عملية التحديث
    setTimeout(() => setSaving(false), 2000); // بعد انتهاء الحفظ، أعد الأيقونة بعد 2 ثانية
  };
  return (
    <div className="inputAddMo astro">
      <div className="form-inputAddMo astro">
        <div className="box-inputAddMo-three astro">
          <div className="min-box astro">
            <input
              type="text"
              id="name"
              value={formData.name}
              placeholder="Enter name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="min-box">
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="min-box">
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="box-inputAddMo-two astro">
          <div className="min-box astro">
            <input
              type="text"
              id="photo"
              value={formData.photo}
              placeholder="Enter image URL"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
            />
          </div>
          <div className="min-box astro">
            <input
              type="text"
              id="comment"
              value={formData.comment}
              placeholder="Enter comment"
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </div>
        </div>

        <div className="box-button">
          <button onClick={handleSave} className="update">
          {saving ? <MdCheck /> : <MdEdit />} {/* يتغير للأيقونة الجديدة */}
          </button>
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="cancel"
          >
            <TbCancel />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputAddUs;
