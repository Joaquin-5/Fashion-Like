const express = require("express");
require("dotenv").config();
const cors = require('cors');
const app = express();
app.use(cors())

const dbfile = require("./connection");

const routesC = require("./ruoutes/clothes");

//body parse

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/clothes", routesC);

app.get("/", (req, res) => {
  res.end("funciona!");
});

app.listen(5000, function () {
  console.log("Encendido");
});
