// components/Modal.tsx
import React from "react";
import styles from "./modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  author: string;
  location: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  author,
  location,
  setTitle,
  setAuthor,
  setLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Edit Book Queue</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            required
          />
          <label htmlFor="location">Description</label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter exchange location"
            required
          />
          <button type="submit">Update Book Queue</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
