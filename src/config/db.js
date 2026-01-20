// src/config/db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: "",
  database: process.env.DB_NAME || "dbs_plannix",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;