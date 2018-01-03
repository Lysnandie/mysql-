
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity (45) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beats Headphones", "Technology", 399.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone","Technology", 299.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mac Book", "Technology", 1999.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Technology", 599.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Table", "Furniture ", 199.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV Stand", "Furniture", 299.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fit Bit", "Technology", 174.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bow and Arrow", "Toys", 24.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4 Wheeler", "Toys", 299.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doll Stroller", "Toys", 39.99, 30);
