CREATE DATABASE IF NOT EXISTS Sopra;

-- Use the created database
USE Sopra;

DROP TABLE IF EXISTS Household;
CREATE TABLE Household (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Household (id) VALUES
(1);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    household_id INT NOT NULL,
    FOREIGN KEY (household_id) REFERENCES Household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name, household_id) VALUES
('Tom_Schönfeld', 'Tom', 'Schönfeld', 1),
('Bob345', 'Bob', 'Schönfeld', 1),
('Michel223', 'Michel', 'Finger', 1);

DROP TABLE IF EXISTS Groceries;
CREATE TABLE Groceries (
    id INT NOT NULL,
    designation VARCHAR(255) PRIMARY KEY,
    quantity FLOAT,
    unit VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Groceries (id, designation, quantity, unit) VALUES
(1,'Apples', 2.5, 'grams'),
(2,'Milk', 1, 'milliliters'),
(3,'Flour', 0.5, 'kilos'),
(4,'Sugar', 500, 'grams');

DROP TABLE IF EXISTS Recipe;
CREATE TABLE Recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    creator INT,
    FOREIGN KEY (creator) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Recipe (id, recipe_title, number_of_persons, creator) VALUES
(1, 'Apple Pie', 8, 1),
(2, 'Pancakes', 4, 2),
(3, 'Omelette', 2, 3);


DROP TABLE IF EXISTS Recipe_Groceries;
CREATE TABLE Recipe_Groceries (
    recipe_id INT NOT NULL,
    groceries_id INT NOT NULL,
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (recipe_id, groceries_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



DROP TABLE IF EXISTS Fridge;
CREATE TABLE Fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge(id) VALUES
(1);

DROP TABLE IF EXISTS Fridge_Groceries;
CREATE TABLE Fridge_Groceries (
    fridge_id INT NOT NULL,
    groceries_id INT NOT NULL,
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (fridge_id, groceries_id),
    FOREIGN KEY (fridge_id) REFERENCES Fridge(id),
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge_Groceries (fridge_id, groceries_id, quantity, unit) VALUES
(1, 1, 2.5, 'grams'),
(1, 2, 1, 'milliliters'),
(1, 3, 0.5, 'kilos'),
(1, 4, 500, 'grams');

DROP TABLE IF EXISTS ShoppingList;
CREATE TABLE ShoppingList (
    shopping_list_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groceries_id INT,
    quantity_needed FLOAT,
    unit VARCHAR(255),
    FOREIGN KEY (groceries_id) REFERENCES Groceries(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ShoppingList (shopping_list_id, groceries_id, quantity_needed, unit) VALUES
(1, 3, 0.5, 'kilos');