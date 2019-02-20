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

// This function prompts the user to either shop or exit:
function start() {
    inquirer
        .prompt({
            name: "shopOrExit",
            type: "list",
            message: "Would you like to [SHOP] for an item or [EXIT]?",
            choices: ["SHOP", "EXIT"]
        })
        .then(function (answer) {
            // Based on the user's answer, this either calls the shop or the exit functions:
            if (answer.shopOrExit === "SHOP") {
                queryItems();
            } else {
                connection.end();
            }
        });
}

// This function queries the database and displays all products to the terminal:
function queryItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.table(results);

        // Once all items are displayed, this prompts the user to select items they want to buy:
        inquirer
            .prompt([
                {
                    name: "item",
                    type: "input",
                    message: "What is the item's product ID that you want to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // This retrieves the information about the chosen item:
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.item)) {
                        chosenItem = results[i];
                    }
                }

                // console.log(chosenItem);

                // This determines if product quantity is sufficient:
                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
                    // If product quantity is sufficient, this updates the db, notifies the user of successful order placement, then starts over:
                    const query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - (parseInt(answer.quantity))
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your order was placed successfully. Your total cost is $" + chosenItem.price * parseInt(answer.quantity) + ".");
                            start();
                        }
                    );
                    // console.log(query.sql);
                }
                else {
                    // If insufficient product quantity, then this notifies the user of insufficient product quantity, apologizes, then starts over:
                    console.log("We're sorry. Insufficient product quantity. Please select another item.");
                    // This re-prompts the user to shop or exit:
                    start();
                }
            });
    });
}




