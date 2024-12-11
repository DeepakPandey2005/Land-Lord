require("dotenv").config();
const mongoose = require("mongoose");
exports.auth_db = mongoose.createConnection(process.env.AUTH_DB);
console.log("users db is  connected");
