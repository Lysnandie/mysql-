const mysql = require("mysql");
const inquirer = require('inquirer');
//npm package to create table
const Table = require('cli-table');
//connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});
//confirm connection to mysql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  bamazon();
  //customerBuy();
});

//bamazon function that dislplays table query on terminal
function bamazon() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    var table = new Table({
      head: ['ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
    });
    for (var i = 0; i < result.length; i++) {
      table.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity])
    }
    console.log(table.toString());

  });

  customerBuy();
}

function customerBuy() {
  //connect to products table
  connection.query("SELECT * FROM products", function(err, results) {
    //take user input to make selection
    inquirer.prompt([{
      name: 'id',
      type: 'input',
      message: 'What is the ID of the product you would like to buy?',
      //validates that user input is a number and requires it
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }, {
      name: 'quantity',
      type: 'input',
      message: 'How many do you want order?',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
      //do this when user input is entered
    }]).then(function(order) {
      //takes in user input
      var productID = order.id;
      var quantity = order.quantity;
      //connects to products table utilizing user input to grab correct ID
      connection.query('SELECT * FROM products WHERE item_id=' + productID, function(err, res) {
        if (err) throw err;
        if (res[0].stock_quantity - quantity >= 0) {
          console.log('Great news! The product is in stock!');
          console.log('Your order for ' + quantity +
            " " + res[0].product_name + ' will be ' + (quantity * res[0].price + ' Thank you for shopping with us!'));
          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [res[0].stock_quantity - quantity, productID],
            function(err, bamazon) {
              if (err) throw err;
            //receive an error that bamazon is not a function when resetting the query
              //bamazon();
            });


        } else if (res[0].stock_quantity - quantity <= res[0].stock_quantity && res[0].stock_quantity !== 0) {
          console.log("We're sorry, we were unable to complete your order because we only have " + res[0].stock_quantity + ' in stock, please update your desired amount.');
          bamazon();
        } else {
          console.log("We're sorry, we were unable to complete your order, the item is no longer in stock. Please check back with us soon!");
          bamazon();
        }
      });

    });
  });
}
