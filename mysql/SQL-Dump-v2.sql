-- Autor: Tom Schönfeld, wichtig --> es handelt sich hierbei nur um einen ersten Entwurf, die Datenbank wird noch um Tabellen erweitert/gekürzt sowie weitere Attribute könnten noch zu den einzelnen Tabellen hinzukommen

CREATE DATABASE IF NOT EXISTS Sopra;

USE Sopra;

DROP TABLE IF EXISTS `Unitofmeasurement`;
CREATE TABLE Unitofmeasurement (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Unitofmeasurement (designation) VALUES
('Kilogram'),
('Gram'),
('Liter'),
('Milliliter');


DROP TABLE IF EXISTS `Groceries`;
CREATE TABLE Groceries (

    Groceries_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    Unitofmeasurement_ID INT,
    Quantity FLOAT,
    FOREIGN KEY (Unitofmeasurement_ID) REFERENCES Unitofmeasurement(ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Groceries (designation, Unitofmeasurement_ID, Quantity) VALUES
('Apples', 1, 2.5),
('Milk', 3, 1),
('Flour', 3, 0.5),
('Sugar', 2, 500);



DROP TABLE IF EXISTS `Recipe`;
CREATE TABLE Recipe (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    ingredients VARCHAR(255), -- Zutatenliste als String
    creator VARCHAR(255) -- Ersteller als String
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe (recipe_title, number_of_persons, ingredients, creator) VALUES
('Apple Pie', 8 , 'Apples, Flour, Sugar', 'Tom'),
('Pancakes', 4 , 'Flour, Milk, Sugar', 'Bob'),
('Omelette', 2 , 'Eggs', 'Michel');


DROP TABLE IF EXISTS `Recipe_Groceries`;
CREATE TABLE Recipe_Groceries (
    recipe_id INT NOT NULL,
    Groceries_ID INT NOT NULL,
    PRIMARY KEY (recipe_id, Groceries_ID),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (Groceries_ID) REFERENCES Groceries(Groceries_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `User`;
CREATE TABLE User (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    google_id VARCHAR(255),
    Name VARCHAR(255),
    last_name VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO User (nick_name, google_id, Name, last_name) VALUES
('Tom_Schönfeld', 'tom_google_id', 'Tom', 'Schönfeld'),
('Bob345', 'bob_google_id', 'Bob', 'Schönfeld'),
('Michel223', 'charlie_google_id', 'Michel', 'Finger');


DROP TABLE IF EXISTS `Household`;
CREATE TABLE Household (
    Household_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    users VARCHAR(255) -- Benutzerliste als string
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Household (users) VALUES
('Tom_Schönfeld, Bob345, Michel223');

DROP TABLE IF EXISTS `Fridge`;
CREATE TABLE Fridge (
    Fridge_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groceries_list VARCHAR(255) -- Liste als string
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Fridge (groceries_list) VALUES
('Apples, Milk, Flour, Sugar');


DROP TABLE IF EXISTS `ShoppingList`;
CREATE TABLE ShoppingList (
    shopping_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingredient VARCHAR(255),
    quantity_needed FLOAT,
    Unitofmeasurement_ID INT,
    FOREIGN KEY (Unitofmeasurement_ID) REFERENCES Unitofmeasurement(ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO ShoppingList(ingredient, quantity_needed, Unitofmeasurement_ID) VALUES
('Flour', 0.5, 9)


