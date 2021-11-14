INSERT INTO department (name)
VALUES
    ('Operations'),
    ('Marketing'),
    ('Finance'),
    ('IT'),
    ('Sales'),
    ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Project Manager', 120000, 1),
    ('Content Marketing Specialist', 70000, 2),
    ('Accountant', 85000, 3),
    ('Systems Engineer', 130000, 4),
    ('Sales Lead', 90000, 5),
    ('Training & Development Manager', 115000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Rick', 'Deckard', 1, NULL),
    ('Sarah', 'Connor', 2, 404),
    ('John', 'Wick', 6, 500),
    ('Fox', 'Mulder', 5, 400),
    ('Dana', 'Scully', 5, 400),
    ('Max', 'Rockatansky', 2, 404),
    ('Alex', 'Murphy', 3, 200),
    ('Ellen', 'Ripley', 6, 500),
    ('Dexter', 'Morgan', 3, 200),
    ('Elliot', 'Alderson', 4, NULL);
