import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import QuoteCard from "../components/QuoteCard";
import { useAuth } from "../store/auth-store";

const Search = () => {
  const { morequotes, loading } = useAuth();

  const [authorName, setAuthorName] = useState("");
  const [quotes, setQuotes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const filteredQuotes = morequotes.filter(
      (quote) =>
        quote.author &&
        quote.author.toLowerCase().includes(authorName.toLowerCase().trim())
    );
    setQuotes(filteredQuotes);
  };

  if (loading) {
    return <h1 style={{ marginLeft: "20rem" }}>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <form
            onSubmit={handleSearch}
            className="form-inline justify-content-center"
          >
            <div className="form-group mb-2">
              <label htmlFor="authorName" className="sr-only">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                id="authorName"
                placeholder="Enter author's name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mx-2 mb-2">
              <FaSearch /> Search
            </button>
          </form>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          {loading && <p>Loading...</p>}
          {quotes.length > 0 && (
            <div>
              <h3 className="mt-4 mb-3">Quotes by {authorName}</h3>
              {quotes.map((quote, index) => (
                <QuoteCard
                  key={index}
                  text={quote.text}
                  author={quote.author}
                />
              ))}
            </div>
          )}
          {quotes.length === 0 && !loading && (
            <p className="mt-4">No quotes found for {authorName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
