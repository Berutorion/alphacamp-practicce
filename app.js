const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const restList = require("./restaurant.json").results;
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
  console.log(restList);
  res.render("index", { restList });
  //res.render("hello");
});
app.get("/restaurants/:id", (req, res) => {
  const restID = req.params.id;
  const selectRest = restList.find((itme) => {
    return itme.id.toString() === restID;
  });
  res.render("show", { selectRest });
});
