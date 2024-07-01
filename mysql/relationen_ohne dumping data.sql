-- Drop existing database and create a new one
DROP DATABASE IF EXISTS Sopra;
CREATE DATABASE Sopra;
USE Sopra;

-- Create Fridge table and insert initial data
DROP TABLE IF EXISTS Fridge;
CREATE TABLE Fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge (id) VALUES (1);

-- Create Household table and insert initial data
DROP TABLE IF EXISTS Household;
CREATE TABLE Household (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    fridge_id INT,
    FOREIGN KEY (fridge_id) REFERENCES Fridge (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Household(name, fridge_id) VALUES ('Der Haushalt', 1);

-- Create Unit table and insert initial data
DROP TABLE IF EXISTS Unit;
CREATE TABLE Unit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(225) NOT NULL,
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES Household(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Unit(designation, household_id) VALUES ('grams', 1), ('liters', 1), ('kilos', 1);

-- Create users table and insert initial data
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    household_id INT,
    google_user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (household_id) REFERENCES Household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name, household_id, google_user_id) VALUES
('Tom_Schönfeld', 'Tom', 'Schönfeld', 1, '232424'),
('Bob345', 'Bob', 'Schönfeld', 1, '23423423'),
('Michel223', 'Michel', 'Finger', 1, '9832342');

-- Create Recipe table and insert initial data
DROP TABLE IF EXISTS Recipe;
CREATE TABLE Recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255) NOT NULL,
    number_of_persons INT NOT NULL,
    creator VARCHAR(255) NOT NULL,
    recipe_description VARCHAR(1000),
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES Household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe (recipe_title, number_of_persons, creator, recipe_description, household_id) VALUES
('Apple Pie', 8, 'Tom', 'Apfelkuchen nach Omas Rezept', 1),
('Pancakes', 4, 'Michel', 'Pfannkuchen ala Michel', 1),
('Omelette', 2, 'Michel', 'Geile Eier', 1);

-- Create Recipe_Groceries table and insert initial data
DROP TABLE IF EXISTS Recipe_Groceries;
CREATE TABLE Recipe_Groceries (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    groceries_designation VARCHAR(255) NOT NULL,
    quantity FLOAT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    PRIMARY KEY (recipe_id, groceries_designation),
    UNIQUE KEY id_unique (id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe_Groceries (recipe_id, groceries_designation, quantity, unit) VALUES
(1, 'Apples', 2.5, 'kilos'),
(1, 'Flour', 500, 'grams'),
(2, 'Milk', 1, 'liters'),
(2, 'Eggs', 6, 'units'),
(3, 'Eggs', 3, 'units'),
(3, 'Cheese', 200, 'grams');

-- Create Fridge_Groceries table and insert initial data
DROP TABLE IF EXISTS Fridge_Groceries;
CREATE TABLE Fridge_Groceries (
    fridge_id INT NOT NULL,
    groceries_designation VARCHAR(255) NOT NULL,
    quantity FLOAT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    PRIMARY KEY (fridge_id, groceries_designation),
    FOREIGN KEY (fridge_id) REFERENCES Fridge(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge_Groceries (fridge_id, groceries_designation, quantity, unit) VALUES
(1, 'Cucumber', 2.5, 'grams'),
(1, 'Tomato', 1, 'liters'),
(1, 'Salmon', 0.5, 'kilos'),
(1, 'Pasta', 500, 'grams');

-- Create ShoppingList table and insert initial data
DROP TABLE IF EXISTS ShoppingList;
CREATE TABLE ShoppingList (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groceries_designation VARCHAR(255) NOT NULL,
    quantity_needed FLOAT NOT NULL,
    unit VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ShoppingList (groceries_designation, quantity_needed, unit) VALUES
('Cucumber', 0.5, 'kilos');

-- Ensure all tables are created and initial data is inserted
