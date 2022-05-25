const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();
const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(adminRoutes);

mongoConnect(() => {
  app.listen(3000);
  console.log("Server listening on port 3000");
});

module.exports = app;
