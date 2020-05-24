const inquirer = require("inquirer");
const connection = require('./connection');

function start() {    
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
        if (answers.choice == "Add Role") {
            addRole();
        }
    });
}
start();

function addDepartment(){
    inquirer.prompt ([
        {
            name: "deptName",
            message: "Please enter the department name: "
        }
    ]).then(function(department){
        connection.query('INSERT INTO department (name) values (?)', [department.deptName], function (err, res) {
            if (err) {
                console.log(err)
            }
            else {
                start();
            }
        });
    }).catch(function(error){
        console.log(error);
    })
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) {
            console.log(err);
        }
        else {
            const departments = res.map(function(department) {
                return department.id + '. ' + department.name;
            });

            inquirer.prompt ([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the role's title: ",
                },
                {
                    type: "input",
                    name: 'salary',
                    message: 'Enter the role salary: ',
                },
                {
                    type: 'list',
                    choices: departments,
                    message: "Enter the department name:",
                    name: 'departmentName',
                }
            ]).then(function(answers) {
                var departmentId = answers.departmentName.split('.')[0];

                connection.query('INSERT INTO department (title, salary, department_id) values (?,?,?) ', [answers.title, answers.salary, departmentId], function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        start();
                    }
                })
            }).catch(function(error){
                console.log(error);
            })
        }
    });
}
