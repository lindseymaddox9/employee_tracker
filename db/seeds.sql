INSERT INTO role (title, salary, department_id)
VALUES
('sales lead'); 



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('John', 'Doe', 1, null);









--SELECT * FROM department;
--SELECT * FROM role;
--SELECT * FROM employee;

SELECT TITLE, SALARY, FIRST_NMAE, LAST_NAME from employee
JOIN employee manager ON  employee.manager_id = manager.id
JOIN rle ON employee.role_id = role.id;
