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
            choices:["Show All Departments", "Show All Roles", "Show All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"]
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
        else if(answer.prompt === "Add Employee"){
            addEmployee()
        }
        else if(answer.prompt === "Update Employee Role"){
            updateemployee()
        }
        else if(answer.prompt === "Exit"){
            connection.end()
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

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?"
        },

        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?"
        },

        {
            type: "input",
            name: "roleId",
            message: "What is your role id?"
        },


    ]).then(response =>{
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES($1, $2, $3)",
         [response.firstName, response.lastName, response.roleId])
         .then((err) => {
          
             console.log("Employee Added!")
        start()
         })
       
    })
}

function updateemployee(){
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
const employeechoices = res.rows.map (item => item.first_name + " " + item.last_name)
inquirer.prompt([
    {
        type:"list",
        name:"employee_choice",
        message:"Which employee would you like to update?",
        choices: employeechoices

    }
]).then (answer =>{
    const chosenEmployee = res.rows.find(item => item.first_name + " " + item.last_name === answer.employee_choice)
    console.log(chosenEmployee)
    connection.query("SELECT * FROM role", (err, res) => {
      
      
        inquirer.prompt([
            {
                type:"list",
                name:"employee_role",
                message:"What role would you like?",
                choices: res.rows.map(item => item.title)
        
            }
        ]).then(answer =>{
            const chosenRole = res.rows.find(item => item.title === answer.employee_role)
            console.log(chosenRole)
            connection.query ("UPDATE employee SET role_id = $1 WHERE id = $2",[chosenRole.id, chosenEmployee.id])
            start()

        }

        )
    })
})

})
        
     
    }

start()
