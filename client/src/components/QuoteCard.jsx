import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaHeart, FaTwitter } from "react-icons/fa";
import styles from "./QuoteCard.module.css";

import { useAuth } from "../store/auth-store";

const QuoteCard = ({ text, author }) => {
  const { likefunc, tweet } = useAuth();
  return (
    <div className={`card ${styles.quoteCard}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <FaQuoteLeft className={`float-left ${styles.quoteIcon}`} />
        <p className={`card-text ${styles.quoteText}`}>{text}</p>
        <FaQuoteRight className={`float-right ${styles.quoteIcon}`} />
        <footer className={`blockquote-footer ${styles.author}`}>
          – {author}
        </footer>
        <div className={`btn-group ${styles.buttonGroup}`} role="group">
          <button
            type="button"
            className={`btn btn-outline-primary ${styles.button}`}
            onClick={() => likefunc(text, author)}
          >
            <FaHeart className={styles.icon} /> Like
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${styles.button}`}
            onClick={() => tweet(text, author)}
          >
            <FaTwitter className={styles.icon} /> Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
