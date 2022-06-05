const inquirer = require("inquirer");
const db = require("./db/connection");
const express = require("express");
const fs = require("fs");
const { json } = require("express");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

//Start menu
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
          "delete a department",
          "delete a role",
          "delete an employee",
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
      } else if (response.action === "delete a department") {
        await deleteDept();
      } else if (response.action === "delete a role") {
        await deleteRole();
      } else if (response.action === "delete an employee") {
        await deleteEmployee();
      } else if (response.action === "update an employee") {
        await updateEmployeeRole();
      } else {
        console.log(
          "Unknown response given: " + JSON.stringify(response, undefined, 4)
        );
      }
    })
    .finally(promptUser);
};

//view
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

//add
const addDept = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department? (required)",
        validate: (department_nameInput) => {
          if (department_nameInput) {
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
      const sql = `INSERT INTO departments (department_name)
          VALUES (?)`;
      const params = [answers.department_name];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error saving employee: ", err.message);
        }
      });
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role you wish to add? (required)",
        validate: (titleInput) => {
          if (titleInput) {
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
        message: "What is the salary for the role? (required)",
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
        name: "department_id",
        message: "Which department ID does the role belong to? (required)",
        validate: (departmentInput) => {
          if (departmentInput) {
            console.log("Department ID was added");
            return true;
          } else {
            console.log("Please enter the department ID.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
      const params = [answers.title, answers.salary, answers.department_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error saving employee: ", err.message);
        }
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message:
          "What is the first name of the employee you wish to add? (required)",
        validate: (first_nameInput) => {
          if (first_nameInput) {
            return true;
          } else {
            console.log("Please enter the first name of the employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message:
          "What is the last name of the employee you wish to add? (required)",
        validate: (last_nameInput) => {
          if (last_nameInput) {
            return true;
          } else {
            console.log("Please enter the last name of the employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter the role ID of the employee. (Required)",
        validate: (role_idInput) => {
          if (role_idInput) {
            console.log("The role was added for the employee");
            return true;
          } else {
            console.log("Please enter the role ID.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the employee ID of the manager?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)`;
      const params = [
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error saving employee: ", err.message);
        }
      });
    });
};

//delete
const deleteDept = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the id of the deparment you wish to delete",
        validate: (department_idInput) => {
          if (department_idInput) {
            return true;
          } else {
            console.log("Please enter the department ID.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql = `DELETE FROM departments WHERE id = ?`;
      const params = [answers.id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error deleting departments: ", err.message);
        }
      });
    });
};

const deleteRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the role ID of the role you wish to delete.",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter the role ID.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql = `DELETE FROM roles WHERE id = ?`;
      const params = [answers.id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error deleting role: ", err.message);
        }
      });
    });
};

const deleteEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the employee you wish to delete?",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter employee ID.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const sql = `DELETE from employees WHERE id = ?`;
      const params = [answers.id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.error("error deleting employee: ", err.message);
        }
      });
    });
};

//update
const updateEmployeeRole = () => {
  return inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message:
          "What is the employee ID of the employee you wish to update? (required)",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("Please enter the employee ID number.");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "role_id",
        message:
          "What is the role ID number of the employee's new role? (required)",
        validate: (role_idInput) => {
          if (role_idInput) {
            return true;
          } else {
            console.log("Please enter the role ID number.");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);

      const sql = `
      UPDATE employees 
      SET role_id = ? 
      WHERE id = ?`;
      const params = [req.answers.id, req.answers.role_id, req.params.id];

      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
          res.json({
            message: "Role ID not found",
          });
        } else {
          res.json({
            message: "success",
            data: req.body,
            changes: result.affectedRows,
          });
        }
      });
    });
};

promptUser();
