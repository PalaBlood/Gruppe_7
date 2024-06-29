DROP DATABASE IF EXISTS Sopra;
CREATE DATABASE Sopra;

USE Sopra;

DROP TABLE IF EXISTS Fridge;
CREATE TABLE Fridge (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge (id) VALUES (1);

DROP TABLE IF EXISTS Household;
CREATE TABLE Household (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    fridge_id INT,
    FOREIGN KEY (fridge_id) REFERENCES Fridge (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Household(id, name) VALUES (2, 'der haushalt');

CREATE TABLE IF NOT EXISTS unit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255) NOT NULL,
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES Household(id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    household_id INT,
    google_user_id VARCHAR(255),
    FOREIGN KEY (household_id) REFERENCES Household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name, household_id, google_user_id) VALUES
('Tom_Schönfeld', 'Tom', 'Schönfeld', 2, '232424'),
('Bob345', 'Bob', 'Schönfeld', 2, '23423423'),
('Michel223', 'Michel', 'Finger', 2, '9832342');

DROP TABLE IF EXISTS Recipe;
CREATE TABLE Recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    creator VARCHAR(255),
    recipe_description VARCHAR(1000),
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES Household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe (id, recipe_title, number_of_persons, creator, recipe_description, household_id) VALUES
(1, 'Apple Pie', 8, 'Tom', "Apfelkuchen nach Omas Rezept", 2),
(2, 'Pancakes', 4, 'Michel', "Pfannkuchen ala Michel", 2),
(3, 'Omelette', 2, 'Michel', "Geile Eier", 2);

DROP TABLE IF EXISTS Recipe_Groceries;
CREATE TABLE Recipe_Groceries (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    groceries_designation VARCHAR(255),
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (recipe_id, groceries_designation),
    UNIQUE KEY id_unique (id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe_Groceries (id, recipe_id, groceries_designation, quantity, unit) VALUES
(1, 1, 'Gurke', 2.5, 'grams');

DROP TABLE IF EXISTS Fridge_Groceries;
CREATE TABLE Fridge_Groceries (
    fridge_id INT NOT NULL,
    groceries_designation VARCHAR(255),
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (fridge_id, groceries_designation),
    FOREIGN KEY (fridge_id) REFERENCES Fridge(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Fridge_Groceries (fridge_id, groceries_designation, quantity, unit) VALUES
(1, 'Gurke', 2.5, 'grams'),
(1, 'Tomate', 1, 'milliliters'),
(1, 'lachs', 0.5, 'kilos'),
(1, 'Pasta', 500, 'grams');

DROP TABLE IF EXISTS ShoppingList;
CREATE TABLE ShoppingList (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groceries_designation VARCHAR(255),
    quantity_needed FLOAT,
    unit VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ShoppingList (id, groceries_designation, quantity_needed, unit) VALUES
(1, 'Gurke', 0.5, 'kilos');

DROP TABLE IF EXISTS Unit;
CREATE TABLE Unit (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(225),
    household_id INT,
    FOREIGN KEY (household_id) REFERENCES Household(id)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
