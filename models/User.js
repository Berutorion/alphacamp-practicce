
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requiered : true
    },
    password: {
        type: String,
        requiered : true
    },
    email: {
        type: String,
        requiered:true
    }
})

module.exports = mongoose.model("User", UserSchema);