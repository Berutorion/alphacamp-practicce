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

module.exports = mongoose.connection;
