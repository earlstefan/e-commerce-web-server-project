var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
  let sql =
    "SELECT * FROM products INNER JOIN productcategories ON products.ProductCategoryID = productcategories.CategoryID";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results);
  });
});

router.get("/getProduct/:ProductID", (req, res) => {
  console.log(req);
  let sql =
    "SELECT * FROM products INNER JOIN productcategories ON products.ProductCategoryID = productcategories.CategoryID WHERE products.ProductID=" +
    parseInt(req.params.ProductID);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results);
  });
});

router.post("/editProduct", (req, res) => {
  console.log(req);

  let sql = `UPDATE products SET ProductSKU = '${
    req.body.ProductSKU
  }', ProductName = '${req.body.ProductName}', ProductPrice = ${
    req.body.ProductPrice
  }, ProductWeight = ${parseFloat(
    req.body.ProductWeight
  )}, ProductCartDesc = '${req.body.ProductCartDesc}', ProductImage = '${
    req.body.ProductImage
  }', ProductStock = ${parseFloat(
    req.body.ProductStock
  )}, ProductLive = 0, ProductUpdateDate = '2021-10-27', ProductCategoryID = ${parseInt(
    req.body.ProductCategoryID
  )} WHERE ProductID = ${parseInt(req.body.ProductID)}`;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results);
  });
});

router.post("/deleteProduct/:ProductID", (req, res) => {
  console.log(req.params);
  let sql = `DELETE FROM products WHERE ProductID = ${parseInt(
    req.params.ProductID
  )}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json(results);
  });
});

router.post("/addProduct", (req, res) => {
  console.log(req.body);

  let sql = `INSERT INTO products (ProductSKU, ProductName, ProductPrice, ProductWeight, ProductCartDesc, ProductImage, ProductStock, ProductLive, ProductUpdateDate, ProductCategoryID) VALUES ('${req.body.ProductSKU}', '${req.body.ProductName}',${req.body.ProductPrice},${req.body.ProductWeight},'${req.body.ProductCartDesc}','${req.body.ProductImage}',${req.body.ProductStock},0,'2021-10-26',${req.body.ProductCategoryID})`;

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

app.listen("4000", () => {
  console.log("Listening to port 4000...");
});
