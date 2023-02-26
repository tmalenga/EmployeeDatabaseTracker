const inquirer = require('inquirer');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_db'
},
  console.log("Connected to the company database.")
  
);

