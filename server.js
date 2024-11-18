const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const server = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const { router } = require("./routes/record.js");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
main().catch((err) => console.log(err));
async function main() {
  mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

server.use("/records", router);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// here the react file will be use after npm run build for using the router correctly

// serveruse('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,process.env.PUBLIC_DIR,'index.html'))
// })
