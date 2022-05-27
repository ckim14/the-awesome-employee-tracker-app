const inquirer = require("inquirer");
const database = require("./db/connection");
const express = require("express");
const fs = require("fs");

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
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
    .then((response) => {
      if (response.add == "view all departments") {
        viewDepts();
      } else if (response.add === "view all roles") {
        viewRoles();
      } else if (response.add === "view all employees") {
        viewEmployees();
      } else if (response.add === "add a department") {
        addDept();
      } else if (response.add === "add a role") {
        addRole();
      } else if (response.add === "add an employee") {
        addEmployee();
      } else if (response.add === "update an employee") {
        updateEmployee();
      } else {
        prompt("You must make a selection.");
      }
    });
};

const viewDepts = () => {};

const viewRoles = () => {};

const viewEmployees = () => {};

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
      departments.push({ answers });
      addToDept();
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
    ])
    .then((answers) => {
      console.log(answers);
      departments.push({ answers });
      addToRole();
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
    ])
    .then((answers) => {
      console.log(answers);
      employee.push({ answers });
      addToEmployee();
    });
};
