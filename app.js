const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
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

//Route
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restList) => {
      res.render("index", { restList });
    })
    .catch((err) => {
      console.log(err);
    });

  //res.render("hello");
});
app.get("/restaurants/:id", (req, res) => {
  const restID = req.params.id;
  Restaurant.findById(restID)
    .lean()
    .then((selectRest) => {
      res.render("show", { selectRest });
    })
    .catch((err) => {
      console.log(err);
    });
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

app.get("/create", (req, res) => {
  res.render("create");
});
app.post("/create", (req, res) => {
  console.log("create data");
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  }).then(() => {
    console.log("Save success.");
  });

  res.redirect("/");
});
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const rest = await Restaurant.findById(id).lean();
  res.render("edit", { rest });
  // res.render("edit",{})
});
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  Restaurant.updateOne(
    { _id: id },
    {
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
    }
  ).then(() => {
    console.log("update success!");
  });
  res.redirect("/");
});
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById({ _id: id }).then((rest) => {
    rest
      .remove()
      .then(() => {
        console.log("has been remove");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
