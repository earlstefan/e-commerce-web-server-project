var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

var router = express.Router();

var mysql = require("mysql2");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password1",
  database: "ecommerce",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/getProducts", (req, res) => {
  let sql = "SELECT * FROM products";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results);
  });
});

router.get("/Sum", (req, res) => {
  let a = req.query.a;
  let b = req.query.b;
  let c = parseInt(a) + parseInt(b);

  res.status(200).json(c);
});

app.use("/", router);

app.listen("8000", () => {
  console.log("Listening to port 8000...");
});
