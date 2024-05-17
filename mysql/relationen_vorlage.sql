Diese tabellen benötigen wir unteranderem


Tabelle users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255),
    google_id VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_id VARCHAR(255)
);

Tabelle groceries
CREATE TABLE groceries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    unit_of_measurement VARCHAR(50),
    quantity FLOAT
);

Tabelle recipes
CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    number_of_persons INT,
    creator_id INT,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);


Tabelle recipe_ingredients
CREATE TABLE recipe_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    grocery_id INT,
    quantity FLOAT,
    unit_of_measurement VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (grocery_id) REFERENCES groceries(id)
);