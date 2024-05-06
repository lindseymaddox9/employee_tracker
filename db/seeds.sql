

INSERT INTO department (department_name)
VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('sales lead', 80000, 1), 
('Engineer', 80000, 2),
('HR Rep', 80000, 3); 



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('John', 'Doe', 1, null), ('Mike', 'Doe', 2, 1), ('Bob', 'Doe', 3, 1);







