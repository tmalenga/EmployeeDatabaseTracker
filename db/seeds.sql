USE employee_db;
INSERT INTO department (name)
VALUES
 ("Sales"),
 ("Production"),
 ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Head of Sales", 150000, 1), 
("Salesperson", 85000, 1), 
("Head of Production", 150000, 2), 
("Production Analyst", 100000, 2), 
("Accountant", 75000, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES 
("The", "People", 1), 
("No", "Jokes", 2), 
("Jane", "Doe", 3),
("John", "Doe", 4), 
("Charlotte", "Lexi", 5); 
