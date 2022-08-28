const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const Restaurant = new Schema({
  id: Number,
  name: {
    type: String,
    required: true,
    min: 3,
  },
  name_en: {
    type: String,
    min: 3,
  },
  category: String,
  image: String,
  phone: String,
  location: String,
  google_map: String,
  rating: Number,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required :true
  }
});

module.exports = mongoose.model("Restaurant", Restaurant);
