DROP DATABASE IF EXISTS Sopra;
CREATE DATABASE Sopra;

USE Sopra;

DROP TABLE IF EXISTS fridge;
CREATE TABLE fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO fridge (id) VALUES (1);

DROP TABLE IF EXISTS household;
CREATE TABLE household (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    fridge_id INT,
    FOREIGN KEY (fridge_id) REFERENCES fridge (id) ON DELETE CASCADE,
    password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO household(id, name, fridge_id, password) VALUES (2, 'Toms Household', 1, '9902');


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    household_id INT,
    google_user_id VARCHAR(255),
    FOREIGN KEY (household_id) REFERENCES household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name, household_id, google_user_id) VALUES
('Tom_Schoenfeld', 'Tom', 'Schoenfeld', 2, '232424'),
('Bob345', 'Bob', 'Schoenfeld', 2, '23423423'),
('Michel223', 'Michel', 'Finger', 2, '9832342');

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    creator VARCHAR(255),
    recipe_description VARCHAR(1000),
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO recipe (id, recipe_title, number_of_persons, creator, recipe_description, household_id) VALUES
(1, 'Apple Pie', 8, 'Tom', "Apfelkuchen nach Omas Rezept", 2),
(2, 'Pancakes', 4, 'Michel', "Pfannkuchen ala Michel", 2),
(3, 'Omelette', 2, 'Michel', "Eier verquirlen, dann anbraten", 2);

DROP TABLE IF EXISTS recipe_groceries;
CREATE TABLE recipe_groceries (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    groceries_designation VARCHAR(255),
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (recipe_id, groceries_designation),
    UNIQUE KEY id_unique (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO recipe_groceries (id, recipe_id, groceries_designation, quantity, unit) VALUES
(1, 1, 'Gurke', 2.5, 'grams');

DROP TABLE IF EXISTS fridge_groceries;
CREATE TABLE fridge_groceries (
    fridge_id INT NOT NULL,
    groceries_designation VARCHAR(255),
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (fridge_id, groceries_designation),
    FOREIGN KEY (fridge_id) REFERENCES fridge(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO fridge_groceries (fridge_id, groceries_designation, quantity, unit) VALUES
(1, 'Gurke', 2.5, 'grams'),
(1, 'Tomate', 1, 'grams'),
(1, 'Lachs', 0.5, 'grams'),
(1, 'Pasta', 500, 'grams');


DROP TABLE IF EXISTS Unit;
CREATE TABLE unit (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(225),
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES household(id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    
INSERT INTO unit (id, designation, household_id) VALUES
(1, 'kilograms', 2)
(1, 'grams', 2)



