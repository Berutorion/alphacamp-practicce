const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");


router.get("/login", (req, res) => {
    res.render("login");
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect:"/users/login"
}) )

router.get("/register", (req, res) => {
    res.render("register");
})
router.post("/register", async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    //檢查email是否重複
    //檢查是否有空欄位
    //檢查兩次密碼輸入是否一致
    try {
    const hash = await bcrypt.hash(password,await bcrypt.genSalt(10))
    await User.create({ name, email, password:hash });
    res.redirect("/users/login");
  
} catch (error) {
        console.log(error);
}
}) 

router.get("/logout", (req, res) => {

    req.logout((err) => {
        if (err) return console.log(err);
        res.redirect("/users/login");
  })
   
})
module.exports = router;