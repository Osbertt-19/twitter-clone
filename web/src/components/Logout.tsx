import React from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

const logoutStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


export default () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Log Out</button>
      <ReactModal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={logoutStyles}
        contentLabel="Logout Modal"
      >
        <div>Are you sure you want to log out?</div>
        <button style={{ marginRight: "4px" }} onClick={handleLogOut}>
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </ReactModal>
    </div>
  );
};
