import { useNavigate } from "react-router-dom";
import twitterLogo from "../assets/twitter-logo.svg";
import home from "../assets/home.svg";
import explore from "../assets/explore.svg";
import messages from "../assets/messages.svg";
import profile from "../assets/profile.svg";
import noti from "../assets/noti.svg";
import more from "../assets/more.svg";

export default () => {
  const navigate = useNavigate();
  const navStyle = { display: "flex", alignItems: "flex-start", gap: "20px" };
  return (
    <div
      className="leftNav"
      style={{
        position: "fixed",
        marginLeft: "80px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <img
        style={{ width: "30px", marginLeft: "5px" }}
        src={twitterLogo}
        alt="twitter-logo"
      />

      <button
        style={navStyle}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={home} alt="twitter-logo" />
        Home
      </button>

      <button
        style={navStyle}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={explore} alt="twitter-logo" />
        Explore
      </button>
      <button
        style={navStyle}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={noti} alt="twitter-logo" />
        Notifications
      </button>
      <button
        style={navStyle}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={messages} alt="twitter-logo" />
        Messages
      </button>

      <button
        style={navStyle}
        onClick={() => {
          navigate("/profile");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={profile} alt="twitter-logo" />
        Profile
      </button>
      <button
        style={navStyle}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        <img style={{ width: "30px" }} src={more} alt="twitter-logo" />
        More
      </button>
      <button
        style={{
          alignSelf: "center",
          width: "250px",
          backgroundColor: "#00acee",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Tweet
      </button>
    </div>
  );
};
