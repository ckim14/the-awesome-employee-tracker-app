const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "P@$$W0rd!",
    database: "workforce",
  },
  console.log("Connected to the workforce database.")
);

module.exports = db;
