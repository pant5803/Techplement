const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcryptjs.genSalt(10);
    const hash_pass = await bcryptjs.hash(user.password, saltRound);

    user.password = hash_pass;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
    console.log("error in generate token");
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
