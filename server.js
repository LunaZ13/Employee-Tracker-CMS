// required dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee'
    },
    console.log('***************************************'),
    console.log('*                                     *'),
    console.log('*        Employee Database            *'),
    console.log('*                                     *'),
    console.log('***************************************')


  );

db.connect(err => {
    if (err) throw err;
    promptUser();
});
// inquirer prompt with options on what to do 
function promptUser() {
    inquirer.prompt({
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Exit'
        ]
    }).then(function (answer) {

        switch (answer.selection) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Exit':
                leavePrompt();
                console.log('====== Now Leaving. ======')
                break;
        };
    })
    
};

// function to view all departments
function viewDepartments() {
    console.log('Viewing all Departments.');
    const sql = `SELECT * FROM department`;
    db.query(sql, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
}

// function to view all roles
function viewRoles() {
    console.log('Viewing all roles.');
    const sql = `SELECT * FROM role`;
    db.query(sql, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
}

// function to view all employees
function viewEmployees() {
    console.log('Viewing all employees.');
    const sql = `SELECT * FROM employees`;
    db.query(sql, function(err, data) {
        if (err) throw err;
        console.table(data);
        promptUser();
    });
}

// function to add a new department
function addDepartment() {

    inquirer.prompt({
        type: 'input', 
        name: 'name',
        message: 'Type in the Department you would like to add?'
        })
        .then(function(answer) {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            db.query(sql, [answer.name], function (err, data) {
                if (err) throw err;
                console.log('Successfully added a new department!')
                viewDepartments();
                promptUser();
            });
        });
};

// function to add a new role
function addRole() {
    const sql = `SELECT * FROM role`;
    db.query(sql, function(err, data) {
        if (err) throw err;

        var deptArray = []

        //for loop
        data.forEach(dept => {
            var obj = {name: dept.name, value: dept.id}
            deptArray.push(obj)
        });
     
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of this role?'
        },
        {
            type: 'input', 
            name: 'salary',
            message: 'What is the salary amount for this role?'
        },
        {
            type: 'list',
            name: 'deptID',
            message: 'What department will this role belong to?',
            choices: deptArray
        }
    ])
    .then(function(answer) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        db.query(sql, [answer.title, answer.salary, answer.deptID], function(err, data) {
            if (err) throw err;
            console.log('Successfully added a new role!')
            viewRoles();
            promptUser();
            });
        });
    });
}

// function to add a new employee
function addEmployee() {
    // const sql = `SELECT * FROM role`;
    // db.query(sql, function(err, data) {
    //     if (err) throw err;
    //     console.table()

    //     var roleArray = []

    //     //for loop
    //     data.forEach(dept => {
    //         var obj = {name: role.name, value: role.id}
    //         roleArray.push(obj)
    //     });
    //     console.log(roleArray)

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is this employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is this employee's last name?"
        },
        {
            type: 'input',
            name: 'roleID',
            message: "What is the employee's role ID number?",
        }
    ])
    .then(function(answer) {
        const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`;
        db.query(sql, [answer.first_name, answer.last_name, answer.roleID], function(err, data) {
            if (err) throw err;
            console.log('Successfully added a new employee!')
            viewEmployees();
            promptUser();
            });
        });
}
// function to exit app
function leavePrompt() {
    db.end();
}