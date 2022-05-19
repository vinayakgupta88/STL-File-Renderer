const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;
// const ejs = require("ejs");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const NodeStl = require("node-stl");
// var StlReader = require("stl-reader");
// const fs = require("fs");--
// const path = require("path");--
// const bcrypt = require("bcrypt");--
// const crypto = require("crypto");--
// const stljs = require("stljs");--

// const Stl = require("./models/STL");--

// const filePath = path.dirname(require.main.filename);--

const app = express();
// const router = express.Router();
// const router = express.Router();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(adminRoutes);
// end changes

// app.post("/index.html", );

mongoConnect(() => {
  app.listen(3000);
});
