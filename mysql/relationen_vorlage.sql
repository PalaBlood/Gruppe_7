Diese tabellen benötigen wir (mindestens)


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255),
    google_id VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_id VARCHAR(255)
);


CREATE TABLE groceries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    unit_of_measurement VARCHAR(50),
    quantity FLOAT
);


CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    number_of_persons INT,
    creator_id INT,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);


CREATE TABLE recipe_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    grocery_id INT,
    quantity FLOAT,
    unit_of_measurement VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (grocery_id) REFERENCES groceries(id)
);


CREATE TABLE fridges (
    id INT AUTO_INCREMENT PRIMARY KEY
);


CREATE TABLE fridge_contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fridge_id INT,
    grocery_id INT,
    FOREIGN KEY (fridge_id) REFERENCES fridges(id),
    FOREIGN KEY (grocery_id) REFERENCES groceries(id)
);


CREATE TABLE households (
    id INT AUTO_INCREMENT PRIMARY KEY
);


CREATE TABLE household_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT,
    user_id INT,
    FOREIGN KEY (household_id) REFERENCES households(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
