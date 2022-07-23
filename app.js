const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const resList = require("./restaurant.json");
const port = 3000;

//set view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//set static file
app.use(express.static("public"));

//Listen server
app.listen(port, () => {
  console.log("Server is working");
});
//Route
app.get("/", (req, res) => {
  const List = resList.results;
  res.render("restaurantList", { resList: List });
  //res.render("hello");
});
