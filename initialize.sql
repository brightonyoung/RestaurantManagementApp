DROP TABLE IF EXISTS recipe, foodCategory, course, steps, quantity, ingredient, measurement;

CREATE TABLE foodCategory (
    id INT NOT NULL AUTO_INCREMENT,
    food_cat_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE course (
    id INT NOT NULL AUTO_INCREMENT,
    course_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE ingredient (
    id INT NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE measurement (
    id INT NOT NULL AUTO_INCREMENT,
    measurement_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT,
    course_id INT,
    food_cat_id INT,
    recipe_name VARCHAR(50),
    recipe_desc VARCHAR(100),
    prep_time TIME,
    cook_time TIME,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id)
    REFERENCES course (id),
    FOREIGN KEY (food_cat_id)
    REFERENCES foodCategory (id)
);

CREATE TABLE quantity (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT,
    ingredient_id INT,
    measurement_id INT,
    ingredient_quantity FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id)
    REFERENCES recipe (id),
    FOREIGN KEY (ingredient_id)
    REFERENCES ingredient (id),
    FOREIGN KEY (measurement_id)
    REFERENCES measurement (id)
);

CREATE TABLE steps (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT,
    step_number INT,
    step_description VARCHAR(250),
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id)
    REFERENCES recipe (id)
);