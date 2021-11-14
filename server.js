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
    console.log('Connected to the election employee.')
  );

// inquirer prompt with options on what to do 







// function to view departments




// function to view roles



// function to view employees



