const restList = require("../data/restaurant.json").results;
const userList = require("../data/user.json").users;
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const connection = require("../config/mogoose");

connection.once("open", async() => {
  userList.forEach(async (user) => {
    const { username, email, password, restIndex } = user;
    try {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const registered = await User.create({ username, email, password: hash });
      const userId = registered._id;
    
      restList.forEach(async (rest) => {
    
        if (restIndex.includes(rest.id)) {
          await Restaurant.create({
            name: rest.name,
            name_en: rest.name_en,
            category: rest.category,
            image: rest.image,
            location: rest.location,
            phone: rest.phone,
            google_map: rest.google_map,
            rating: rest.rating,
            description: rest.description,
            userId
          })
        } 

        Restaurant.find().count((err, count) => {
          if (err) console.log(err);
          if (count >= restList.length-2) {
            console.log("User & restaurint has been ready.");
            process.exit();
          } 
        })
      })

     
    } catch (error) {
      console.log(error);
    }

  })  
  
  
 
})

