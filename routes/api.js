const router = require("express").Router();
const Restaurant = require("../models/Restaurant");

//搜尋功能
router.get("/search", async (req, res) => {
  const userId = req.user._id
  const restList = await Restaurant.find({userId}).lean();
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

module.exports = router;
