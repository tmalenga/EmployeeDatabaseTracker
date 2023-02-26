const inquirer = require('inquirer');
const init = require('./assets/app')
const db = require("./db/connection");
const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      init();
    });
  });

// const mysql = require('mysql2');

// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'employee_db'
// },
//   console.log("Connected to the company database.")

// );

