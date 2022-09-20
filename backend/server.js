const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

const dbfile = require("./connection");

const routesC = require("./ruoutes/clothes");
const routesA = require("./ruoutes/auth");

// Middleware
const checkRole = require("./middleware/check-role");

//body parse

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/clothes", routesC);
app.use("/api/user", routesA);
app.use("/api/users", checkRole, require("./ruoutes/users"));

app.get("/", (req, res) => {
  res.end("funciona!");
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Encendido");
});
