import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Home
      </button>
      <button>Explore</button>
      <button>Notifications</button>
      <button>Messages</button>
      <button>Bookmarks</button>
      <button>Lists</button>
      <button
        onClick={() => {
          navigate("/profile");
          window.location.reload();
        }}
      >
        Profile
      </button>
      <button>More</button>
      <button>Tweet</button>
    </div>
  );
};
