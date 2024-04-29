--Autor: Tom Schönfeld, wichtig --> es handelt sich hierbei nur um einen ersten Entwurf, die Datenbank wird noch um Tabellen erweitert/gekürzt sowie weitere Attribute könnten noch zu den einzelnen Tabbeln hinzukommen



CREATE TABLE Quantity (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    value FLOAT
);

CREATE TABLE Unitofmeasurement (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255)
);

CREATE TABLE Groceries (

    Groceries_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    Unitofmeasurement_ID INT,
    quantity_ID INT,
    FOREIGN KEY (Unitofmeasurement_ID) REFERENCES Unitofmeasurement(ID),
    FOREIGN KEY (quantity_ID) REFERENCES Quantity(ID)
);

CREATE TABLE Recipe (
    recipe_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_title VARCHAR(255),
    number_of_persons INT,
    ingredients VARCHAR(255), -- Zutatenliste als String
    creator VARCHAR(255) -- Ersteller als String
);

CREATE TABLE Recipe_Groceries (
    recipe_id INT NOT NULL,
    Groceries_ID INT NOT NULL,
    PRIMARY KEY (recipe_id, Groceries_ID),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (Groceries_ID) REFERENCES Groceries(Groceries_ID)
);

CREATE TABLE User (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name VARCHAR(255),
    google_id VARCHAR(255),
    Name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE Household (
    Household_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    users VARCHAR(255) -- Benutzerliste als string
);

CREATE TABLE Fridge (
    Fridge_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groceries_list VARCHAR(255) -- Liste als string
);