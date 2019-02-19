var mysql = require("mysql");
var inquirer = require("inquirer");

// creates the connection information for the sql database:
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

// connects to the mysql server and sql database:
connection.connect(function (err) {
    if (err) throw err;
    // // runs the start function after the connection is made to prompt the user:
    // queryItems();
    start();
});

// function that prompts the user for which action they should take:
function start() {
    inquirer
        .prompt({
            name: "shopOrExit",
            type: "list",
            message: "Would you like to [SHOP] for an item or [EXIT]?",
            choices: ["SHOP", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either calls the shop or the exit functions:
            if (answer.shopOrExit === "SHOP") {
                queryItems();
            } else {
                connection.end();
            }
        });
}

function queryItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        makeSelection();
    });
}

// function to handle item selection:
function makeSelection() {
    // query the database for all items being selected:
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once all items are displayed, prompts the user to select item(s) they want to buy:
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_ID);
                        }
                        return choiceArray;
                    },
                    message: "What is the product ID of the item you want to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want to buy?",
                }
            ])
            .then(function (answer) {
                // retrieves the information of the chosen item:
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_ID === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determines if product quantity is sufficient:
                if (chosenItem.highest_bid < parseInt(answer.bid)) {
                    // product quantity is sufficient, so updates db, notifies the user, and starts over:
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your order was placed successfully.");
                            start();
                        }
                    );
                }
                else {
                    // insufficient product quantity, so apologize and start over:
                    console.log("We're sorry. Insufficient product quantity. Please select another item.");
                    // re-prompts the user to shop or exit:
                    start();
                }
            });
    });
}


// // function to handle item selection:
// function postSelection() {
//     // prompts for info about the item being selected:
//     inquirer
//         .prompt([
//             {
//                 name: "item",
//                 type: "input",
//                 message: "What is the product ID of the item you want to buy?"
//             },
//             {
//                 name: "quantity",
//                 type: "input",
//                 message: "How many do you want to buy?",

//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             // when finished prompting, inserts a new item into the db with that info:
//             connection.query(
//                 "INSERT INTO products SET ?",
//                 {
//                     item_name: answer.item,
//                     category: answer.category,
//                     starting_bid: answer.startingBid || 0,
//                     highest_bid: answer.startingBid || 0
//                 },
//                 function (err) {
//                     if (err) throw err;
//                     console.log("Your order was created successfully!");
//                     // re-prompts the user if they want to shop or exit:
//                     start();
//                 }
//             );
//         });
// }

