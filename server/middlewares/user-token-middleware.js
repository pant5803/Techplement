const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const usertokenmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(400)
      .json({ message: "user not identified, please login/signup" });
  }
  const jwttoken = token.replace("Bearer ", "").trim();
  try {
    const verifyToken = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: verifyToken.email }).select({
      password: 0,
    });
    req.user = userData;
    req.token = jwttoken;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "user not identified, please login/signup" });
  }
};
module.exports = { usertokenmiddleware };
