const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const methodOverride = require("method-override");
const restRoute = require("./routes/index").rest;
const pageRoute = require("./routes/index").page;
const apiRoute = require("./routes/index").api;
const userRoute = require("./routes/index").users;
require("dotenv").config();
require("./config/mogoose");

//set view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//set static file
app.use(express.static("public"));
//body-parser
app.use(express.urlencoded({ extended: true }));
//add method-override
app.use(methodOverride("_method"));

//Listen server
app.listen(port, () => {
  console.log("Server is working");
});
//Route
app.use("/restaurants", restRoute);
app.use("/page", pageRoute);
app.use("/api", apiRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});
