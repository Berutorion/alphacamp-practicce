const router = require("express").Router();
const Restaurant = require("../models/Restaurant");

// const methodOverride = require("method-override");

// router.use(methodOverride("_method"));
//獲取全部餐廳資料
router.get("/", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({userId})
    .lean()
    .then((restList) => {
      res.render("index", { restList });
    })
    .catch((err) => {
      console.log(err);
    });
});
//獲取特定餐廳資料
router.get("/:id", (req, res) => {
  const restID = req.params.id;
  const userId = req.user._id;
  Restaurant.findOne({_id:restID , userId})
    .lean()
    .then((selectRest) => {
      res.render("show", { selectRest });
    })
    .catch((err) => {
      console.log(err);
    });
});

//新增一筆資料
router.post("/", (req, res) => {
  console.log("create data");
  const userId = req.user._id;
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
    userId
  }).then(() => {
    console.log("Save success.");
  });

  res.redirect("/");
});

//修改一筆資料
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
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
    { _id: id ,userId},
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
  res.redirect("/restaurants");
});

//刪除一筆資料
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Restaurant.findById({ _id: id,userId }).then((rest) => {
    rest
      .remove()
      .then(() => {
        console.log("has been remove");
        res.redirect("/restaurants");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
