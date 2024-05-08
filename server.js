const inquirer = require("inquirer")
const {Pool} = require("pg")
const cTable = require("console.table")


const connection = new Pool({
    host:"localhost",
    user: "postgres",
    password:"your password",
    database:"employee_tracker",
    port: 5432
})

connection.connect()


function start(){
    inquirer.prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "prompt",
            choices:["Show All Departments", "Show All Roles", "Show All Employees", "Add Department", "Add Role", "Add Employee"]
        }
    ]).then(answer => {

        if(answer.prompt === "Show All Departments"){
            viewDepartments()
        }
        else if(answer.prompt === "Show All Roles"){
            viewRoles()
        }
        else if(answer.prompt === "Show All Employees"){
            viewEmployees()
        }
        else if(answer.prompt === "Add Department"){
            addDepartment()
        }
        else if(answer.prompt === "Add Role"){
            addRole()
        }
    })
}


function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        ///error viewing department
        console.table(res.rows)
        start()
    })
};

function viewRoles(){
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;

        console.table(res.rows)
        start()
    })
};

function viewEmployees(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        console.table(res.rows)
        start()
    })
};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What department are you adding?"
        }
    ]).then(response =>{
        connection.query("INSERT INTO department (department_name) VALUES($1)", [response.newDepartment])
        console.log("Department Added!")
        start()
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What role are you adding?"
        },

        {
            type: "input",
            name: "newSalary",
            message: "What is your salery?"
        },

        {
            type: "input",
            name: "newDepartment_id",
            message: "What is your department id?"
        },


    ]).then(response =>{
        connection.query("INSERT INTO role (title, salary, department_id) VALUES($1, $2, $3)",
         [response.newRole, response.newSalary, response.newDepartment_id])
         .then((err) => {
          
             console.log("Role Added!")
        start()
         })
       
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What role are you adding?"
        },

        {
            type: "input",
            name: "newSalary",
            message: "What is your salery?"
        },

        {
            type: "input",
            name: "newDepartment_id",
            message: "What is your department id?"
        },

// change info to employee
    ]).then(response =>{
        connection.query("INSERT INTO role (title, salary, department_id) VALUES($1, $2, $3)",
         [response.newRole, response.newSalary, response.newDepartment_id])
         .then((err) => {
          
             console.log("Role Added!")
        start()
         })
       
    })
}
//update employee table by resetting the a chosen role id of the chosen employee (id)
//UPDATE employee SET role_id = ? WHERE id = ?


//join the role and department tables to get back the department name and the role details.
// function viewRoles() {
//     const query =`
//     SELECTrole.id, role.title, role.salary, department.department_name
//     FROM role 
//     JOIN department ON role.department_id=department.id
//     `;
//     connection.query( query, (err, res) => {
//         if (err) throw err;
//         console.table(res, rows);
//         start();
//     })
// }

//join the employee data, role title, department name, 
//salary, and manager's first and last names.

// function viewEmployees() {
//     const query = `
//       SELECT emplyee.id, employee.first_name, employee.last_name, role.title, 
//       department.department_name, role.salary, manager.first_name AS manager_first_name,
//       manager.last_name AS manager_last_name
//       FROM employee 
//       LEFT JOIN role r ON employee.role_id = role.id
//       LEFT JOIN department department ON role.department_id = department.id
//       LEFT JOIN employee m ON emplyee.manager_id = manager.id
//     `;
//     connection.query(query, (err, res) => {
//       if (err) throw err;
//       console.table(res.rows);
//       start();
//     });
//   }



start()

