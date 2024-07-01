import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth-store";
import styles from "./Home.module.css";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaHeart,
  FaTwitter,
  FaRedo,
} from "react-icons/fa";
const Home = () => {
  const { morequotes, loading, likefunc, tweet } = useAuth();

  if (loading) {
    return <h1 style={{ marginLeft: "20rem" }}>Loading...</h1>;
  }

  const [currentQuote, setCurrentQuote] = useState({});

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * morequotes.length);
    console.log(randomIndex);
    setCurrentQuote(morequotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote(); // Get initial quote

    const intervalId = setInterval(() => {
      getRandomQuote();
    }, 86400000); // Change quote every 86400 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.quoteContainer}>
          <FaQuoteLeft className={styles.quoteIcon} />
          <p className={styles.quote}>{currentQuote.text}</p>
          <FaQuoteRight className={styles.quoteIcon} />
          <p className={styles.author}>– {currentQuote.author}</p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => likefunc(currentQuote.text, currentQuote.author)}
            >
              <FaHeart className={styles.icon} /> Like
            </button>
            <button
              className={styles.button}
              onClick={() => tweet(currentQuote.text, currentQuote.author)}
            >
              <FaTwitter className={styles.icon} /> Tweet
            </button>
            <button className={styles.button} onClick={getRandomQuote}>
              <FaRedo className={styles.icon} /> New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
