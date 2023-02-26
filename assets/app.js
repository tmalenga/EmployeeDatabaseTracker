const db = require("../db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");

// inquirer prompts
const init = () => {
    inquirer.prompt([
      {
        type: "list",
        name: "userInput",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update an employee's manager",
          "View employees by manager",
          "View employees by department",
          "Remove a department",
          "Remove a role",
          "Remove an employee",
          "Exit"
        ]
      }
    ])
    .then(data => {
        const response = data.userInput;
        console.log(response);
        if( response == "View all departments"){
            viewDeparments();
        }
    })
}

function viewDeparments (){
    db.query(`SELECT * FROM department`, (err, rows) =>{
        if (err) { 
            throw err; 
        }
        console.table(rows);

    })
}

module.exports = init;