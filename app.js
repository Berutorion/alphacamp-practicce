const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const restRoute = require("./routes/index").rest;
const pageRoute = require("./routes/index").page;
const apiRoute = require("./routes/index").api;
require("dotenv").config();
//connect to mongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((err) => {
    console.log("Has sone error", err);
  });

//set view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//set static file
app.use(express.static("public"));
//body-parser
app.use(express.urlencoded({ extended: true }));
//Listen server
app.listen(port, () => {
  console.log("Server is working");
});
//add method-override
app.use(methodOverride("_method"));

//Route
app.use("/restaurants", restRoute);
app.use("/page", pageRoute);
app.use("/api", apiRoute);
