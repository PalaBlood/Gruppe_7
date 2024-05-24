-- Autor: Tom Schönfeld, wichtig --> es handelt sich hierbei nur um einen ersten Entwurf, die Datenbank wird noch um Tabellen erweitert/gekürzt sowie weitere Attribute könnten noch zu den einzelnen Tabellen hinzukommen

CREATE DATABASE IF NOT EXISTS Sopra;

USE Sopra;


DROP TABLE IF EXISTS `Groceries`;
CREATE TABLE Groceries (

    Groceries_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    quantity FLOAT,
    Unit VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Groceries (designation, Quantity, Unit) VALUES
('Apples', 2.5, 'grams'),
('Milk',  1, 'mililiters'),
('Flour',  0.5, 'kilos'),
('Sugar',  500, 'grams');



DROP TABLE IF EXISTS `Recipe`;
CREATE TABLE Recipe (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    creator INT
    FOREIGN KEY (creator) REFERENCES Users(user_id)  -- Ersteller als Referenz auf User_ID
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Recipe (recipe_title, number_of_persons, ingredients) VALUES
('Apple Pie', 8 , 'Apples, Flour, Sugar'),
('Pancakes', 4 , 'Flour, Milk, Sugar'),
('Omelette', 2 , 'Eggs');


DROP TABLE IF EXISTS `Recipe_Groceries`;
CREATE TABLE Recipe_Groceries (
    recipe_id INT NOT NULL,
    Groceries_ID INT NOT NULL,
    quantity FLOAT,
    unit VARCHAR(255),
    PRIMARY KEY (recipe_id, Groceries_ID),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (Groceries_ID) REFERENCES Groceries(Groceries_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (nick_name, first_name, last_name) VALUES
('Tom_Schönfeld', 'Tom', 'Schönfeld'),
('Bob345', 'Bob', 'Schönfeld'),
('Michel223', 'Michel', 'Finger');


DROP TABLE IF EXISTS `Household`;
CREATE TABLE Household (
    Household_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    users INT,
    FOREIGN KEY (users) REFERENCES users(user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Fridge`;
CREATE TABLE Fridge (
    Fridge_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    household_id INT NOT NULL,
    Groceries_ID INT NOT NULL,
    quantity,
    unit,
    FOREIGN KEY household_id REFERENCES Household(Household_ID),
    FOREIGN KEY Groceries_ID REFERENCES Groceries(Groceries_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Fridge (groceries_list) VALUES
('Apples, Milk, Flour, Sugar');


DROP TABLE IF EXISTS `ShoppingList`;
CREATE TABLE ShoppingList (
    shopping_list_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ingredient_id VARCHAR(255),
    quantity_needed FLOAT,
    unit,
    FOREIGN KEY ingredient_id REFERENCES Groceries(Groceries_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO ShoppingList(ingredient, quantity_needed) VALUES
('Flour', 0.5);


DROP TABLE IF EXISTS `FoodEntry`;
CREATE TABLE FoodEntry (
    FoodEntry_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Quantity FLOAT,
    Groceries_ID INT,
    Fridge_ID INT,
    FOREIGN KEY(Groceries_ID) REFERENCES Groceries(Groceries_ID),
    FOREIGN KEY(Fridge_ID) REFERENCES Fridge(Fridge_ID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO FoodEntry(Quantity) VALUES
('200')


