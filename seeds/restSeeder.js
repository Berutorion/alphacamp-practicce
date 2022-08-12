const restList = require("../restaurant.json").results;
const Restaurant = require("../models/Restaurant");

require("../config/mogoose");

restList.forEach((element) => {
  Restaurant.create({
    name: element.name,
    name_en: element.name_en,
    category: element.category,
    image: element.image,
    location: element.location,
    phone: element.phone,
    google_map: element.google_map,
    rating: element.rating,
    description: element.description,
  }).then(() => {
    console.log("Save success.");
  });
});
