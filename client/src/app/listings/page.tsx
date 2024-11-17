"use client";

import React, { useState } from "react";
import { CuteInput } from "@components/input";
import { CuteButton } from "@components/button";
import { cuteToast } from "@utils";
import { bookQueueService } from "@services";
import { BookQueue } from "@appTypes";
import { Horizontal, Vertical } from "@components/container";

import styles from "./listings.module.scss";

const SearchPage = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BookQueue[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const [results, error] = await bookQueueService.getAllBookQueues({
        bookName,
        bookAuthor: author,
      });

      if (error || !results) throw error;

      setSearchResults(results);
    } catch (error) {
      cuteToast(error.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Vertical
      styles={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Horizontal>
        <Vertical>
          <h1 className={styles.pageTitle}>Search for Books</h1>
          <form onSubmit={handleSearch} className={styles.form}>
            <Vertical>
              <label htmlFor="bookName" className={styles.label}>
                Book Title
              </label>
              <CuteInput
                id="bookName"
                value={bookName}
                onChange={setBookName}
                placeholder="Enter the book title"
                className={styles.input}
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
              />

              <CuteButton
                type="submit"
                className={styles.searchButton}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
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
          <h2>Search Results</h2>
          <Vertical>
            {loading ? (
              <p>Loading results...</p>
            ) : (
              <>
                {searchResults.length === 0 ? (
                  <p>
                    No books found for Book name : &quot;{bookName}&quot; and
                    Author :&quot;
                    {author}&quot;.
                  </p>
                ) : (
                  <ul
                    className={styles.resultList}
                    style={{ maxHeight: "500px" }}
                  >
                    {searchResults.map((bookQueue) => (
                      <li key={bookQueue.id} className={styles.resultItem}>
                        <Horizontal>
                          <h3>{bookQueue.bookName}</h3>
                          <p>
                            <strong>Author:</strong> {bookQueue.bookAuthor}
                          </p>
                          <p>{bookQueue.status}</p>
                        </Horizontal>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </Vertical>
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};

export default SearchPage;
