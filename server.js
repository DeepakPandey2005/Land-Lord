const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const server = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const { router } = require("./routes/record.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.js");
const ensureAuthenticated = require("./authMiddleware/checkAuth.js");

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
main().catch((err) => console.log(err));
async function main() {
  mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

server.use("/auth", authRouter);
server.use("/records", ensureAuthenticated, router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

