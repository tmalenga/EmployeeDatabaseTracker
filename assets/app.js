const db = require("../db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");
const { type } = require("os");

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
        //   "Update an employee role",
        //   "Update an employee's manager",
        //   "View employees by manager",
        //   "View employees by department",
        //   "Remove a department",
        //   "Remove a role",
        //   "Remove an employee",
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
        else if( response == "View all roles"){
            viewRoles();
        }
        else if( response == "View all employees"){
            viewEmployees();
        }
        else if( response == "Add a department"){
            addDepartment();
        }
    })
}

function viewDeparments (){
    db.query(`SELECT * FROM department`, (err, rows) =>{
        if (err) { 
            throw err; 
        }
        console.table(rows);
        init();
    })
};

function viewRoles (){
    db.query(`SELECT role.id, 
                     role.title, 
                     role.salary, 
                     department.name AS departments 
                     FROM role LEFT JOIN department ON role.department_id = department.id`, (err, rows) =>{
        if (err) { 
            throw err; 
        }
        console.table(rows);
        init();

    })
};

function viewEmployees (){
    db.query(`SELECT employee.id, 
                     employee.first_name, 
                     employee.last_name 
                     FROM employee`, (err, rows) =>{
        if (err) { 
            throw err; 
        }
        console.table(rows);
        init();
    })
};

function addDepartment () {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Please enter the name of the department: ",
        }
    ])
    .then(data => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const newDept = data.dept_name;
        db.query(sql, newDept, (err) => {
            if (err){
                throw err
            }
            else {
                console.log("Dept added");
                viewDeparments();
            }
        });
    })
   

}




module.exports = init;