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
