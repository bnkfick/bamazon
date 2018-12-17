DROP DATABASE IF EXISTS bamazonDB; 

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", 350.00, 10),
("Nintendo Switch", "Electronics", 250.00, 8),
("iPhone 10 Case", "Electronics", 25.00, 100),

("Blender", "Kitchen", 65.00, 15),
("Waffle Maker", "Kitchen", 25.00, 15),
("Toaster", "Kitchen", 45.00, 15),


("Chess", "Games", 15.00, 100),
("Checkers", "Games", 15.00, 100),
("Pictionary", "Games", 20.00, 100),
("Battleship", "Games", 20.00, 100),
("Family Feud", "Games", 10.00, 100),

("Sweatshirt", "Clothes", 30.00, 5),
("T-Shirt", "Clothes", 15.00, 200),
("Jeans", "Clothes", 80.00, 40),

("Ruby Earrings", "Jewelry", 4000.00, 2),
("Ruby Ring", "Jewelry", 6000.00, 1),
("Ruby Necklace", "Jewelry", 2000.00, 2),

("Coffee", "Food", 9.99, 32),

("Vanilla Candle", "Decor", 10.00, 77);