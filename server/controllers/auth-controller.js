const User = require("../models/user-model");
const Quote = require("../models/quote-model");
const bcryptjs = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).send("welcome home");
  } catch (error) {
    res.status(500).send("error");
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // user exist ?
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(409).json({ message: "user already exist" });
    } else {
      const newuser = await User.create({ username, email, password });
      res.status(200).json({
        message: "user registered successfully",
        token: await newuser.generateToken(),
        userId: newuser._id.toString(),
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "error in user registration : server error" });
  }
};

const login = async (req, res) => {
  try {
    const enteredmail = req.body.email;
    const enteredpass = req.body.password;

    // check if mail exist in db
    const dbuser = await User.findOne({ email: enteredmail });
    if (dbuser) {
      // user found : now match password
      const isvalidpassword = await bcryptjs.compare(
        enteredpass,
        dbuser.password
      );
      if (isvalidpassword) {
        // login successful
        res.status(200).json({
          message: "login successful",
          token: await dbuser.generateToken(),
          userId: dbuser._id.toString(),
        });
      } else {
        // password do not match
        res.status(401).json({ message: "invalid credentials" });
      }
    } else {
      // mail not found in db
      res.status(400).json({ message: "user not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

// getuser function
const getuser = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ message: userData });
  } catch (error) {
    res.status(400).json({ message: "can not get user, server error" });
  }
};

// likequote
const likequote = async (req, res) => {
  try {
    const useremail = req.user.email;
    const quotetext = req.body.text;
    const quoteauthor = req.body.author;

    // check if already liked ?
    const dbquote = await Quote.findOne({
      email: useremail,
      text: quotetext,
    });

    if (dbquote) {
      // quote found :
      res.status(400).json({
        message: "already liked",
      });
    } else {
      const newquote = await Quote.create({
        text: quotetext,
        email: useremail,
        author: quoteauthor,
      });
      res.status(200).json({
        message: "saved to liked quotes",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "can't like : server error" });
  }
};

// DIS - likequote
const dislikequote = async (req, res) => {
  try {
    const useremail = req.user.email;
    const quotetext = req.body.text;
    await Quote.deleteOne({ email: useremail, text: quotetext });
    res.status(200).json({ message: "quote removed from likes" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "can't dis-like : server error" });
  }
};

const likedquotes = async (req, res) => {
  try {
    const useremail = req.user.email;

    const r = await Quote.find({ email: useremail });
    res.status(200).json(r);
  } catch (error) {
    res
      .status(400)
      .json({ message: "no liked quotes to display, server error" });
  }
};

module.exports = {
  home,
  register,
  login,
  getuser,
  likequote,
  likedquotes,
  dislikequote,
};
