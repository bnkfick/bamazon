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
    console.log("connected as id " + connection.threadId);
});


//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{
        type: "list",
        name: "actions",
        message: "WELCOME SUPERVISOR. What would you like to review?",
        choices: ["View Inventory", "View Product Sales by Department", "Create New Department", "Exit"]

    }]).then(function (user) {
        if (user.actions === "View Inventory") {
            viewInventory();
        } else if (user.actions === "View Product Sales by Department") {
            viewSales();
        } else if (user.actions === "Create New Department") {
            createDept();
        } else if (user.actions === "Exit") {
            console.log("Come back soon!");
            process.exit(0);
        } else {
            console.log("Come back soon!");
            process.exit(0);
        }
    });
}

//=================================View Inventory===============================
function viewInventory() {

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

function viewSales() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Costs', 'Product Sales', 'Total Profit'],
        colWidths: [10, 30, 30, 30, 30]
    });

    console.log("================================= SALES ===============================");
    var table = new Table({
        head: ['Dept ID', 'Dept Name', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    var sql = " SELECT " +
        "   d.department_id, " +
        "   d.department_name, " +
        "   d.over_head_costs, " +
        "   SUM(products.product_sales) as product_sales, " +
        "   (SUM(products.product_sales) - departments.over_head_cost)  - d.over_head_costs as total_profit " +
        "FROM products p " +
        "   RIGHT JOIN departments d ON p.department_name = d.department_name " +
        "GROUP BY " +
        "   d.department_id, " +
        "   d.department_name, " +
        "   d.over_head_costs";

    connection.query(sql
        , function (error, results) {
            if (error) throw error;
            console.log(results);
            table.push(
                [results.department_id, productName, department_name, price, stockQuantity]
            );


            startPrompt();
        })
};



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

function createDept() {
    inquirer.prompt([{
        name: "new_dept",
        message: "What is the Name of the new Department?",
        type: "input",
    }, {
        name: "new_overhead",
        message: "What is this departments overhead costs",
        type: "input",
        validate: (value) => {
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number'
        }
    }]).then(function (answers) {
        console.log(answers.new_dept);
        console.log(answers.new_overhead);

        connection.query("INSERT INTO departments SET ?", {
            department_name: answers.new_dept,
            over_head_costs: answers.new_overhead
        }, function (err, res) {

            console.log(`Department Added Successfully!`);
            startPrompt();
        });
    })
}

startPrompt();