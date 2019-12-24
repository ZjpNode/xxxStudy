const mysql = require("mysql");
const config = require("./config.js");

delete config.database;
console.log(config)
let db = mysql.createConnection(config)
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});
db.query("CREATE DATABASE IF NOT EXISTS `cart-example`")
db.query("USE `cart-example`")
db.query("DROP TABLE IF EXISTS item")
db.query("CREATE TABLE item (id INT(11) AUTO_INCREMENT," +
    "title VARCHAR(255)," +
    "description TEXT," +
    "created DATETIME," +
    "PRIMARY KEY (id))");
db.query("DROP TABLE IF EXISTS review")
db.query("CREATE TABLE review (id INT(11) AUTO_INCREMENT," +
    "item_id INT(11)," +
    "text TEXT," +
    "stars INT(1)," +
    "created DATETIME," +
    "PRIMARY KEY (id))")
db.end(function () {
    process.exit();
})
