import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaHeart, FaTwitter } from "react-icons/fa";
import styles from "./MoreQuotes.module.css";

import { useAuth } from "../store/auth-store";

const MoreQuotes = () => {
  const { morequotes, loading, likefunc, tweet } = useAuth();

  if (loading) {
    return <h1 style={{ marginLeft: "20rem" }}>Loading...</h1>;
  }

  return (
    <div className={styles.moreQuotesContainer}>
      <div className={styles.mainContent}>
        {morequotes.map((quote, index) => (
          <div key={index} className={styles.quoteCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.quote}>{quote.text}</p>
            <FaQuoteRight className={styles.quoteIcon} />
            <p className={styles.author}>– {quote.author}</p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => likefunc(quote.text, quote.author)}
              >
                <FaHeart className={styles.icon} /> Like
              </button>
              <button
                className={styles.button}
                onClick={() => tweet(quote.text, quote.author)}
              >
                <FaTwitter className={styles.icon} /> Tweet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreQuotes;
