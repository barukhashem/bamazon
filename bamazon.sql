-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
  -- Makes a string column called "name" which cannot contain null --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,

  department_name VARCHAR(30) NOT NULL,

  price INTEGER(100) NOT NULL,

  stock_quantity INTEGER(100) NOT NULL,

  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Helmet", "Gear", 135, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Gear", 375, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chaps", "Gear", 275, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boots", "Gear", 150, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tires", "Service", 750, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pipes", "Service", 875, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Foot Pegs", "Accessories", 60, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wind Whip", "Accessories", 50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Luggage Rack", "Accessories", 250, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flag", "Accessories", 25, 5);