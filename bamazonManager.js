var mysql = require("mysql");
var inquirer = require("inquirer");

// This creates the connection information for the sql database:
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306:
    port: 3306,

    // Your username:
    user: "root",

    // Your password:
    password: "root",
    database: "bamazon_db"
});

// This connects to the mysql server and sql database:
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// This function prompts the user which action to take:
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    viewProducts();
                    break;

                case "View low inventory":
                    viewLowInventory();
                    break;

                case "Add to inventory":
                    addToInventory();
                    break;

                case "Add new product":
                    addNewProduct();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.table(results);
        start()
    }
    )
}
// function viewLowInventory() {
// }

// function addToInventory() {
// }

// function addNewProduct() {
// }

