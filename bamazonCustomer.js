//=================================Setup Required Variables===============================

var mysql = require('mysql');
var inquirer = require('inquirer');

//=================================Connect to SQL database===============================

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",
  
    password: "root",
    database: "bamazonDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view the inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
                var sql = "SELECT * FROM products";
                console.log(sql);

                connection.query(sql, function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        //console.log(res[i]);
                        console.log([
                            res[i].item_id,
                            res[i].product_name,
                            res[i].department_name,
                            res[i].price,
                            res[i].stock_quantity
                        ].join(" | "));
                    }
                    console.log("\n====================================================== Current Bamazon Inventory ======================================================\n");
                });
            
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}