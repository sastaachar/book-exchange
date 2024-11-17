import React, { useState, useEffect } from "react";
import { CuteInput } from "@components/input";
import { CuteButton } from "@components/button";
import styles from "./book-queue.module.scss";
import { cuteToast } from "@utils";
import { bookQueueService } from "@services";
import { useAppContext } from "@context";
import { BookQueue } from "@appTypes";
import { Horizontal, Vertical } from "@components/container"; // Assuming this is the location for the updateBookQueue API
import { t } from "i18next";
import Modal from "@components/modal";

export const AddBookQueuePage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookQueues, setBookQueues] = useState<BookQueue[]>([]);
  const [editingBookQueue, setEditingBookQueue] = useState<BookQueue | null>(
    null
  );

  const { user } = useAppContext();

  // Fetch the list of currently listed books
  useEffect(() => {
    const fetchBookQueues = async () => {
      try {
        if (!user?.id) return;
        const [bookQueues, bookQueueError] =
          await bookQueueService.getAllBookQueues({
            userId: user.id,
          });

        if (bookQueueError || bookQueues === null) throw bookQueueError;
        setBookQueues(bookQueues);
      } catch (error) {
        cuteToast(error.message, { type: "error" });
      }
    };

    fetchBookQueues();
  }, [user]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If editing an existing book, update it using the update API
      if (editingBookQueue) {
        const [updatedBookQueue, error] =
          await bookQueueService.updateBookQueue(
            {
              bookAuthor: author,
              bookName: title,
              exchangeLocation: location,
            },
            editingBookQueue.id
          );

        if (error || !updatedBookQueue) throw error;
        setBookQueues((queues) =>
          queues.map((queue) =>
            queue.id === updatedBookQueue.id ? updatedBookQueue : queue
          )
        );
      } else {
        // If not editing, create a new book queue
        const [bookQueue, error] = await bookQueueService.createBookQueue({
          bookAuthor: author,
          bookName: title,
          exchangeLocation: location,
        });
        if (error || bookQueue === null) throw error;
        setBookQueues((queues) => [...queues, bookQueue]);
      }
    } catch (error) {
      cuteToast(error.message, { type: "error" });
    } finally {
      setLoading(false);
      setEditingBookQueue(null); // Clear the editing state after submission
    }
  };

  // Handle editing a book queue
  const handleEdit = (bookQueue: BookQueue) => {
    setEditingBookQueue(bookQueue);
    setTitle(bookQueue.bookName);
    setAuthor(bookQueue.bookAuthor || "");
    setLocation(bookQueue.exchangeLocation || "");
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBookQueue) {
        const [updatedBookQueue, err] = await bookQueueService.updateBookQueue(
          {
            bookAuthor: author,
            bookName: title,
            exchangeLocation: location,
          },
          editingBookQueue.id
        );

        if (!updatedBookQueue || err) throw err;

        setBookQueues((queues) =>
          queues.map((queue) =>
            queue.id === updatedBookQueue.id ? updatedBookQueue : queue
          )
        );
      }
    } catch (error) {
      cuteToast(error.message, { type: "error" });
    } finally {
      setLoading(false);
      setEditingBookQueue(null);
    }
  };
  return (
    <Vertical>
      <Horizontal>
        <Vertical>
          <h1 className={styles.pageTitle}>
            {editingBookQueue ? "Edit Book Queue" : "Add a Book Queue Listing"}
          </h1>
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <Vertical>
              <label htmlFor="title" className={styles.label}>
                Book Title
              </label>
              <CuteInput
                id="title"
                value={title}
                onChange={setTitle}
                placeholder="Enter the book title"
                className={styles.input}
                required
              />

              <label htmlFor="author" className={styles.label}>
                Author
              </label>
              <CuteInput
                id="author"
                value={author}
                onChange={setAuthor}
                placeholder="Enter the author's name"
                className={styles.input}
                required
              />

              <label htmlFor="location" className={styles.label}>
                {t("Location")}
              </label>
              <CuteInput
                id="location"
                value={location}
                onChange={setLocation}
                placeholder="Enter an exchange location"
                className={styles.input}
                required
              />

              <CuteButton
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : editingBookQueue
                  ? "Update Listing"
                  : "Submit Listing"}
              </CuteButton>
            </Vertical>
          </form>
        </Vertical>

        <Vertical
          styles={{
            maxHeight: "500px",
            overflow: "scroll",
          }}
        >
          <h2>Currently Listed Books</h2>
          <Vertical>
            {bookQueues.length === 0 ? (
              <p>No books are currently listed.</p>
            ) : (
              <ul className={styles.bookList}>
                {bookQueues.map((bookQueue) => (
                  <li key={bookQueue.id} className={styles.bookListItem}>
                    <Horizontal>
                      <h3>{bookQueue.bookName}</h3>
                      <p>
                        <strong>Author:</strong> {bookQueue.bookAuthor}
                      </p>
                      <p>{bookQueue.status}</p>
                      <CuteButton
                        onClick={() => handleEdit(bookQueue)}
                        className={styles.editButton}
                      >
                        Edit
                      </CuteButton>
                    </Horizontal>
                  </li>
                ))}
              </ul>
            )}
          </Vertical>
        </Vertical>

        <Modal
          isOpen={editingBookQueue !== null}
          onClose={() => setEditingBookQueue(null)}
          onSubmit={handleModalSubmit}
          title={title}
          author={author}
          location={location}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setLocation={setLocation}
        />
      </Horizontal>
    </Vertical>
  );
};
