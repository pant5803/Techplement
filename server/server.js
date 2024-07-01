require("dotenv").config();
const cors = require("cors");
const { corsOptions } = require("./middlewares/cors-middleware");
const express = require("express");
const app = express();
const connectDB = require("./utils/db");
const router = require("./router/auth-router");

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", router);

connectDB().then(() => {
  const PORT = 3000;
  app.listen(PORT);
});
