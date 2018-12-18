

var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');



var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
});


//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{

        type: "list",
        name: "actions",
        message: "WELCOME MANAGER. What would you like to review?",
        choices: ["View Products For Sale", "View Low Inventory", "Update Inventory", "Add New Product"]

    }]).then(function (user) {
        if (user.actions === "View Products For Sale") {
            inventoryView();
        } else if (user.actions === "View Low Inventory") {
            lowInventory();
        } else if (user.actions === "Update Inventory") {
            addInventory();
        } else {
            addProduct();
        }
    });
}

//=================================View Inventory===============================

function inventoryView() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    console.log("================================= INVENTORY ===============================");
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    // VIEW INVENTORY //
    var sql = "SELECT * FROM products";
    console.log(sql);

    connection.query(sql, function (err, res) {
        if (err) throw err;

        console.log('\nCurrent Bamazon Inventory: ');

        for (var i = 0; i < res.length; i++) {
            var itemId = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

            table.push(
                [itemId, productName, departmentName, price, stockQuantity]
            );
        }
        console.log(table.toString());
        startPrompt();
    })
}
//=================================View Low Inventory===============================

//Connect to database to show any inventory with less than 5 in stock quantity

function lowInventory() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listLowInventory();


    function listLowInventory() {

        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {

                //check if any of the stock_quantity equals 5 or less

                if (res[i].stock_quantity <= 5) {

                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;

                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
            }
            console.log("");
            console.log("============================================= Low Bamazon Inventory (5 or Less in Stock) ===============================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            startPrompt();
        });
    }
}

//=================================Update Inventory===============================

function addInventory() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        validate: validateID,
        message: "UPDATE ITEM QUANTITY: Enter the ID number of the item.",
    },
    {
        type: "input",
        name: "inputNumber",
        validate: validateQty,
        message: "ENTER NEW QUANTITY",

    }
    ]).then(function (updateQty) {

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: updateQty.inputNumber
        }, 
        {
            item_id: updateQty.inputId
        }], function (err, res) {
        });
        startPrompt();
    });
}

function validateID(userInput) {
    var prodID = userInput;
    if (prodID) { prodID = userInput.trim(); }
    if (isNumeric) {
        return true;
    } else {
        console.log("Please enter a valid ID NUMBER");
        return false;
    }

}

function isNumeric(num) {
    if (/^\d+$/.test(num)) {
        return true;
    } else {
        return false;
    }
}

function validateQty(userInput) {
    var prodQty = userInput;
    if (prodQty) { prodQty = userInput.trim(); }
    if (isNumeric) {
        return true;
    } else {
        console.log("Please enter a valid NUMERIC QUANTITY");
        return false;
    }
}
//=================================Add New Product===============================

function addProduct() {

    inquirer.prompt([{

        type: "input",
        name: "inputName",
        message: "Enter the ITEM NAME of the new product.",
    },
    {
        type: "input",
        name: "inputDepartment",
        message: "Enter the DEPARTMENT NAME of the new product.",
    },
    {
        type: "input",
        name: "inputPrice",
        message: "Enter the PRICE of the new product [0.00].",
    },
    {
        type: "input",
        name: "inputStock",
        message: "Enter the QUANTITY of the new product.",
    }

    ]).then(function (newProduct) {

        //connect to database, insert column data with input from user

        connection.query("INSERT INTO products SET ?", {
            product_name: newProduct.inputName,
            department_name: newProduct.inputDepartment,
            price: newProduct.inputPrice,
            stock_quantity: newProduct.inputStock
        }, function (err, res) { });
        startPrompt();
    });
}

startPrompt();