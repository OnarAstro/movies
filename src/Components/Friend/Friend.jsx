import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import "./Friend.css";
import { RiUserLine } from "react-icons/ri";

const Friend = () => {
  const { users } = useContext(UsersContext);

  // تحقق مما إذا كانت `users` غير معرّفة أو ليست مصفوفة
  if (!users || !Array.isArray(users)) {
    return <p className="loading-text">Loading friend activity...</p>;
  }

  return (
    <div className="friend astro">
    <div className="box-friend astro">
      <div className="title-friend astro">
        <h3 className="astro">Friend Activity</h3>
        <RiUserLine className="icon astro" />
      </div>
      <div className="box-card-friend astro">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="card-friend astro">
              <img
                src={user.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                className="astro"
                width={150}
                alt={user.name || "Unknown User"}
                onError={(e) =>
                  (e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                }
              />
              <div className="text-friend astro">
                <h4 className="astro">{user.name || "Unknown User"}</h4>
                <p className="astro">
                  Watching{" "}
                  <span className="astro">
                    {user.comment ? user.comment.slice(0, 20) : "No recent activity"}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-text">No friends are currently active.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Friend;
