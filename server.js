const inquirer = require("inquirer")
const {Pool} = require("pg")
const cTable = require("console.table")
const { default: ListPrompt } = require("inquirer/lib/prompts/list")


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
            choices:["Show All Departments", "Show All Roles", "Show All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
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
        else if(answer.prompt === "Update Employee Role"){
            updateemployee()
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
            message: "What is your salary?"
        },

        {
            type: "input",
            name: "newDepartment_id",
            message: "What is your department id?"
        },


    ]).then(response =>{
        connection.query("INSERT INTO role (first name, last name, employee role) VALUES($1, $2, $3)",
         [response.firstName, response.lastName, response.employeeRole_id])
         .then((err) => {
          
             console.log("Employee Added!")
        start()
         })
       
    })
}

function updateemployee(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
const employeechoices = res.rows.map (item =>({
    name:`${item.first_name} ${item.last_name}`, value:item.id
}))
inquirer.prompt([
    {
        type:"list",
        name:"employee choice",
        message:"Which employee would you like to update?",
        choices:employeechoices
    }
]).then

})
        
        start()
    }


//update employee table by resetting the a chosen role id of the chosen employee (id)
//UPDATE employee SET role_id = ? WHERE id = ?



start()
