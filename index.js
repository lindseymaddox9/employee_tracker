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
        // et al.

    })
}


function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        /// 
        console.table(res.rows)
        start()
    })
}

function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        console.log(res.rows)
        start()
    })
}

function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        console.log(res.rows)
        start()
    })
}






start()




