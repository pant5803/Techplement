const express = require("express");
const router = express.Router();

const {
  home,
  register,
  login,
  getuser,
  likequote,
  dislikequote,
  likedquotes,
} = require("../controllers/auth-controller");

const { usertokenmiddleware } = require("../middlewares/user-token-middleware");

const { validate, signupSchema } = require("../zod/zod-validator");

router.route("/").get(home);

router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);

router.route("/getuser").get(usertokenmiddleware, getuser);
router.route("/like").post(usertokenmiddleware, likequote);
router.route("/dislike").post(usertokenmiddleware, dislikequote);

router.route("/likedquotes").get(usertokenmiddleware, likedquotes);

module.exports = router;
