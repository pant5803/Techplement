import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // define functions and variables here ---
  const [morequotes, setmorequotes] = useState([]);
  // loading flag
  const [loading, setLoading] = useState(true);
  // userData
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  // token
  const [token, settoken] = useState(localStorage.getItem("token"));

  // function to get user data
  const user = async () => {
    try {
      const res = await fetch("http://localhost:3000/getuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const resultant = await res.json();
        setUserData({
          username: resultant.message.username,
          email: resultant.message.email,
        });
      } else {
        setUserData({
          username: "",
          email: "",
        });
      }
    } catch (error) {
      setUserData({
        username: "",
        email: "",
      });
      console.log("unable to get user details");
    }
  };

  // fetch userData
  useEffect(() => {
    user();
  }, [token]);

  // function to fetch quotes from api
  const fetchquotes = async () => {
    try {
      const response = await fetch(`https://type.fit/api/quotes`);
      if (response.ok) {
        const allQuotes = await response.json();
        console.log(allQuotes);
        setLoading(false);
        console.log("loading over");
        setmorequotes(allQuotes);
      } else {
        console.log("can not fetch data from api. Site not responding");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchquotes();
  }, []);

  // function to logout user
  const logoutfunc = () => {
    localStorage.removeItem("token");
    settoken(localStorage.getItem("token"));
    setUserData({
      username: "",
      email: "",
    });
  };

  // function to like user
  const likefunc = async (text, author) => {
    const obj = {
      text,
      author,
    };
    const res = await fetch("http://localhost:3000/like", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    try {
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };
  // function to dislike quote
  const dislikefunc = async (text) => {
    const obj = {
      text,
    };
    const res = await fetch("http://localhost:3000/dislike", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    try {
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };
  // tweet function
  const tweet = async (text, author) => {
    const url = `https://twitter.com/intent/tweet?text=${text} ${author}`;
    window.open(url);
  };

  return (
    <AuthContext.Provider
      value={{
        morequotes,
        loading,
        userData,
        token,
        settoken,
        logoutfunc,
        likefunc,
        dislikefunc,
        tweet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
