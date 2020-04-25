const inquirer = require("inquirer");
const connection = require('./connection');



inquirer.prompt ([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["Add department", "Add Role", "Add employees", "View departments", "View roles", "View employees",
    "Update Employee Roles"],
        name: "choice"
    }
]).then(function (answers) {
    if (answers.choice == "Add department"){
        addDepartment();
    }
})

function addDepartment(){
    inquirer.prompt ([
        {
            name: "deptName",
            message: "Please enter the department name: "
        }
    ]).then(function(department){
        return connection.qurery('INSERT INTO departments SET ?', department);
    }).catch(function(error){
        console.log(error);
    })
}




