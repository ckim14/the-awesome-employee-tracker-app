INSERT INTO departments (department_name)
VALUES
  ('Finance'),
  ('Sales'),
  ('Legal'),
  ('Technology');
  

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Accountant', 140000.00, 1),
  ('Engineer', 300000.00, 4),
  ('Client Manager', 100000.00, 2),
  ('Real Estate Lawyer', 250000.00, 3);


  INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Franco', 4, 0),
  ('Johnny', 'Depp', 1, 1),
  ('Amber', 'Heard', 3, 2);
