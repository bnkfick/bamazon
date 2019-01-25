//=================================Setup Required Variables===============================

var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//=================================Connect to SQL database===============================

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view the inventory?",
        default: true

    }]).then(function (user) {
        if (user.confirm === true) {
            console.log("================================= INVENTORY ===============================");
            // instantiate
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
                //console.log('....................\n');

                for (var i = 0; i < res.length; i++) {
                    //console.log(res[i]);
                    // console.log([
                    //     res[i].item_id,
                    //     res[i].product_name,
                    //     res[i].department_name,
                    //     res[i].price,
                    //     res[i].stock_quantity
                    // ].join(" | "));

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
                purchasePrompt();
            })
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}

//================================= USER PURCHASE ===============================//

function purchasePrompt() {
    console.log("yes");
    inquirer.prompt([{
        type: "confirm",
        name: "purchase",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function (user) {
        if (user.purchase === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come back soon!");
        }
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
//check to see if the user input is a single letter
function isNumeric(num) {
    if (/^\d+$/.test(num)) {
        //.log("test passed");
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
//=================================Item selection and Quantity desired===============================

function selectionPrompt() {

    inquirer.prompt([{

        type: "input",
        name: "inputId",
        validate: validateID,
        message: "Enter the ID# of the item you want to purchase.",
    },
    {
        type: "input",
        name: "inputNumber",
        validate: validateQty,
        message: "How many would you like to purchase?",

    }
    ]).then(function (userPurchase) {


        var sql = "SELECT * FROM products WHERE item_id=?";
        connection.query(sql, [userPurchase.inputId], function (err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("===================================================");
                    console.log("Sorry! Not enough in stock. Please try again later.");
                    console.log(res[i].stock_quantity + res[i].stock_quantity + " IN STOCK");
                    console.log("===================================================");
                    
                    //@todo prompt revise quantity
                    startPrompt();

                } else {
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("===================================");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("===================================");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===================================");

                    var newQty = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    //console.log(newQty);
                    confirmPrompt(newQty, purchaseId);
                }
            }
        });
    });
}

//=================================Confirm Purchase===============================

function confirmPrompt(newQty, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you want to purchase this item and quantity?",
        default: true

    }]).then(function (userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQty
            }, {
                item_id: purchaseId
            }], function (err, res) { });

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startPrompt();
        }
    });
}

startPrompt();