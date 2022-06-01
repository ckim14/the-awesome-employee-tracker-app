const inquirer = require("inquirer");
const db = require("./db/connection");
const express = require("express");
const fs = require("fs");
const { json } = require("express");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        validate: (input) => (!input ? "You must make a selection" : true),
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee",
        ],
      },
    ])
    .then(async (response) => {
      console.clear();
      if (response.action == "view all departments") {
        viewDepts();
      } else if (response.action === "view all roles") {
        viewRoles();
      } else if (response.action === "view all employees") {
        viewEmployees();
      } else if (response.action === "add a department") {
        await addDept();
      } else if (response.action === "add a role") {
        await addRole();
      } else if (response.action === "add an employee") {
        await addEmployee();
      } else if (response.action === "update an employee") {
        await updateEmployee();
      } else {
        console.log(
          "Unknown response given: " + JSON.stringify(response, undefined, 4)
        );
      }
    })
    .finally(promptUser);
};

const viewDepts = () => {
  db.query("SELECT * FROM departments;", (err, results) => {
    console.table(results);
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM roles;", (err, results) => {
    console.table(results);
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employees;", (err, results) => {
    console.table(results);
  });
};

const addDept = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department? (required)",
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          } else {
            console.log("Please enter the name of the department.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      db.query(
        db.format(
          "INSERT INTO departments (department_name) VALUES (?)",
          answers.department
        )
      );
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the title of the role you wish to add? (required)",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("Please enter the title of the role.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salalry for the role? (required)",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("Please enter the salary for the role.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "department",
        message: "What is the name of the department? (required)",
        validate: (departmentInput) => {
          if (departmentInput) {
            console.log("The role was created");
            return true;
          } else {
            console.log("Please enter the name of the department.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      db.query(
        db.format(
          "INSERT INTO Departments (department_name) VALUES (?)",
          answers.department
        )
      );
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message:
          "What is the first name of the employee you wish to add? (required)",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("Please enter the first name of the employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message:
          "What is the last name of the employee you wish to add? (required)",
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("Please enter the last name of the employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role",
        message: "What is the title of the role you wish to add? (required)",
        validate: (roleInput) => {
          if (roleInput) {
            console.log("The role was created");
            return true;
          } else {
            console.log("Please enter the title of the role.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role",
        message: "What is the employee ID of their manager?",
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("Please enter the employee ID of the manager.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      employee.push({ answers });
    });
};

promptUser();
