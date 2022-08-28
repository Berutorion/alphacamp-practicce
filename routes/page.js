const router = require("express").Router();
const Restaurant = require("../models/Restaurant");
//獲取新增頁面
router.get("/create", (req, res) => {
  res.render("create");
});

//獲取修改頁面
router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const rest = await Restaurant.findOne({_id :id ,userId}).lean();
  res.render("edit", { rest });
  // res.render("edit",{})
});

module.exports = router;
