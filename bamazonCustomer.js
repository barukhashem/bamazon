const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createConnection();
});

function queryProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}

// function start() {
//     inquirer.prompt([{
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: ["BUY", "EXIT"],
//         name: "choice"
//     }]).then(function (answer) {
//         switch (answer.choice) {
//             case "BUY":
//                 postItem();
//                 break;
//             // case "BID":
//             //     bidItem();
//             //     break;
//             case "EXIT":
//                 connection.end();

//         };

//     });

// }

// function buyItem() {
//     inquirer.prompt([{
//         type: "input",
//         message: "Please enter the product's ID.",
//         ID: "ID"
//     }, {
//         type: "input",
//         message: "How many units of the product would you like to buy?",
//         name: "quantity"
//     }]).then(function (answer) {
//         console.log("Checking if item is in stock...\n");
//         connection.query(
//             "INSERT INTO items SET ?",
//             {
//                 item_name: answer.name,
//                 bid: answer.bid
//             },
//             function (err, res) {
//                 console.log(res.affectedRows + " item posted!\n");
//                 start();
//             })
//     });
// }
