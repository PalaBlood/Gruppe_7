CREATE DATABASE IF NOT EXISTS Sopra;
USE Sopra;

-- Unit of Measurement Table --> brauchen wir Unitofmeasurement? --> eventuell trivial
DROP TABLE IF EXISTS `UnitOfMeasurement`;
CREATE TABLE UnitOfMeasurement (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO UnitOfMeasurement (designation) VALUES
('Kilogram'),
('Gram'),
('Liter'),
('Milliliter');

-- Users Table
DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name) VALUES
('Tom_Schönfeld', 'Tom', 'Schönfeld'),
('Bob345', 'Bob', 'Schönfeld'),
('Michel223', 'Michel', 'Finger');

-- Household Table
DROP TABLE IF EXISTS `Household`;
CREATE TABLE Household (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a household for parent row
INSERT INTO Household (id) VALUES (1);

-- Household_Users Table (Many-to-Many relationship)
DROP TABLE IF EXISTS `Household_Users`;
CREATE TABLE Household_Users (
    household_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (household_id, user_id),
    FOREIGN KEY (household_id) REFERENCES Household(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Household_Users (household_id, user_id) VALUES
(1, 1), (1, 2), (1, 3);

-- Groceries Table
DROP TABLE IF EXISTS `Groceries`;
CREATE TABLE Groceries (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255) NOT NULL,
    quantity FLOAT NOT NULL,
    unit_of_measurement_id INT NOT NULL,
    FOREIGN KEY (unit_of_measurement_id) REFERENCES UnitOfMeasurement(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Groceries (designation, quantity, unit_of_measurement_id) VALUES
('Apples', 2.5, 2),
('Milk', 1, 4),
('Flour', 0.5, 1),
('Sugar', 500, 2);

-- Recipe Table
DROP TABLE IF EXISTS `Recipe`;
CREATE TABLE Recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    number_of_persons INT NOT NULL,
    creator_id INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe (title, number_of_persons, creator_id) VALUES
('Apple Pie', 8, 1),
('Pancakes', 4, 2),
('Omelette', 2, 3);

-- Recipe_Groceries Table (Many-to-Many relationship)
DROP TABLE IF EXISTS `Recipe_Groceries`;
CREATE TABLE Recipe_Groceries (
    recipe_id INT NOT NULL,
    groceries_id INT NOT NULL,
    PRIMARY KEY (recipe_id, groceries_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Fridge Table
DROP TABLE IF EXISTS `Fridge`;
CREATE TABLE Fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert a fridge entry to ensure there is a parent row for the foreign key
INSERT INTO Fridge (id) VALUES (1);

-- Fridge_Groceries Table (Many-to-Many relationship)
DROP TABLE IF EXISTS `Fridge_Groceries`;
CREATE TABLE Fridge_Groceries (
    fridge_id INT NOT NULL,
    groceries_id INT NOT NULL,
    PRIMARY KEY (fridge_id, groceries_id),
    FOREIGN KEY (fridge_id) REFERENCES Fridge(id),
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge_Groceries (fridge_id, groceries_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4);

-- ShoppingList Table
DROP TABLE IF EXISTS `ShoppingList`;
CREATE TABLE ShoppingList (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingredient VARCHAR(255) NOT NULL,
    quantity_needed FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ShoppingList (ingredient, quantity_needed) VALUES
('Flour', 0.5);

-- FoodEntry Table
DROP TABLE IF EXISTS `FoodEntry`;
CREATE TABLE FoodEntry (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quantity FLOAT NOT NULL,
    groceries_id INT NOT NULL,
    fridge_id INT NOT NULL,
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id),
    FOREIGN KEY (fridge_id) REFERENCES Fridge(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO FoodEntry (quantity, groceries_id, fridge_id) VALUES
(200, 1, 1);
