const inquirer = require("inquirer")
const {Pool} = require("pg")

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
            choices:["Show All Departments", "Show All Roles"]
        }
    ]).then(answer => {

        if(answer.prompt === "Show All Departments"){
            viewDepartments()
        }
        else if(answer.prompt === "Show All Roles"){
            viewRoles()
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

function viewDepartments(){
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;

        console.log(res.rows)
        start()
    })
};

function viewDepartments(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        console.log(res.rows)
        start()
    })
};

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


