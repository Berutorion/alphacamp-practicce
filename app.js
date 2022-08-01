const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const restList = require("./restaurant.json").results;
const port = 3000;
const mongoose = require("mongoose");

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

//Listen server
app.listen(port, () => {
  console.log("Server is working");
});

//Route
app.get("/", (req, res) => {
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

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  let filterList;
  filterList = restList.filter((item) => {
    return (
      item.category.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword)
    );
  });
  if (filterList.length === 0) {
    res.render("notFound", { keyword });
  } else {
    res.render("index", { restList: filterList, keyword });
  }
});
