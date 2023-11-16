// ModalComponent.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    height: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComponent = ({ toggleModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(toggleModal);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    setModalIsOpen(toggleModal);
  }, [toggleModal]);

  return (
    <div className={cx("container")}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
};

export default ModalComponent;
