import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaHeart, FaTwitter } from "react-icons/fa";
import { RiThumbDownLine } from "react-icons/ri";
import styles from "./MoreQuotes.module.css";
import { useAuth } from "../store/auth-store";
const LikedQuotes = () => {
  const { token, dislikefunc, tweet } = useAuth();
  const [quotes, setquotes] = useState([]);

  // function to get all the liked quotes of the user
  const getlikedquotes = async () => {
    const r = await fetch("http://localhost:3000/likedquotes", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const arr = await r.json();
    setquotes(arr);
  };
  // call this function
  useEffect(() => {
    getlikedquotes();
  }, [token]);

  // handleDislike
  const handleDislike = (text) => {
    dislikefunc(text);
    getlikedquotes();
  };

  return (
    <div className={styles.moreQuotesContainer}>
      <div className={styles.mainContent}>
        {quotes.length == 0 ? <h1>No Liked Quotes...</h1> : <></>}
        {quotes.map((quote, index) => (
          <div key={index} className={styles.quoteCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.quote}>{quote.text}</p>
            <FaQuoteRight className={styles.quoteIcon} />
            <p className={styles.author}>– {quote.author}</p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => handleDislike(quote.text)}
              >
                <RiThumbDownLine className={styles.icon} /> Dis-Like
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

export default LikedQuotes;
