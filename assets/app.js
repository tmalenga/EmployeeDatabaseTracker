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
          "Update an employee role",
        //   "Update an employee's manager",
        //   "View employees by manager",
        //   "View employees by department",
        //   "Remove a department",
        //   "Remove a role",
        //   "Remove an employee",
        //   "View the total utilized budget"
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
        else if( response == "Add a role"){
            addRole();
        }
        else if( response == "Add an employee"){
            addEmployee();
        }
        else if( response == "Update an employee role"){
            updateEmployeeRole();
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
    };

//     INSERT INTO roles (title, salary, department_id)
// VALUES 
// ("Head of Sales", 150000, 1), 

    function addRole () {
        inquirer.prompt([
            {
                type: "input",
                name: "newTitle",
                message: "Please enter the new job title: ",
            },
    
            {
                type: "input",
                name: "newSalary",
                message: "Please enter the salary: ",
            },
    
            {
                type: "input",
                name: "departmentId",
                message: "Please enter the department id: ",
            }
        ])
        .then(data => {
            const sql = `INSERT INTO role SET ?`;
            const values = {title: data.newTitle, salary: data.newSalary, department_id: data.departmentId};
            db.query(sql, values, (err) => {
                if (err){
                    throw err
                }
                else {
                    console.log("New role added");
                    return viewRoles();
                }
            });
        }) 
    };

 function addEmployee () {
    inquirer.prompt([
        {
            type: "input",
            name: "fname",
            message: "Please enter the first name of the employee: ",
        },

        {
            type: "input",
            name: "lname",
            message: "Please enter the last name of the employee: ",
        },

        {
            type: "input",
            name: "roleId",
            message: "Please enter the role id of the employee: ",
        }
    ])
    .then(data => {
        const sql = `INSERT INTO employee SET ?`;
        const values = {first_name: data.fname, last_name: data.lname, role_id: data.roleId};
        db.query(sql, values, (err) => {
            if (err){
                throw err
            }
            else {
                console.log("New employee added");
                return viewEmployees();
            }
        });
    }) 
};

function updateEmployeeRole () {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Please enter the id of the employee: ",
        },

        {
            type: "input",
            name: "newRole",
            message: "Please enter the role id of the employee: ",
        }
    ])
    .then(data => {
        const sql = `UPDATE employee SET role_id = ${data.newRole} WHERE id = ${data.employeeId}`;
        //const values = {role_id: data.newRole, id: data.employeeId};
        db.query(sql, (err) => {
            if (err){
                throw err
            }
            else {
                console.log("Employee role updated");
                return viewEmployees();
            }
        });
    }) 
};





module.exports = init;