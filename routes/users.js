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
router.post("/register", async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;
    const warning =[];
    //檢查email是否重複
    if (await User.findOne({ email })) {
        console.log("已被註冊");
        warning.push("這個email已經被註冊過了!!");
    }
    //檢查是否有空欄位
    if (!name | !email | !password | !confirmPassword) warning.push("不得有欄位為空值!!");
    //檢查兩次密碼輸入是否一致
    if (password != confirmPassword) warning.push( "密碼與密碼確認須為一致!!");

    if (warning.length > 0) {
        req.flash("warning_msg", warning);
        return res.render("register", { name, email, password, confirmPassword ,warning_msg:req.flash("warning_msg")});
    }

    try {
    const hash = await bcrypt.hash(password,await bcrypt.genSalt(10))
        await User.create({ name, email, password: hash });
        req.flash("success_msg", "註冊成功，請重新登入");
    res.redirect("/users/login");
  
} catch (error) {
        console.log(error);
}
}) 

router.get("/logout", (req, res) => {

    req.logout((err) => {
        if (err) return console.log(err);
        req.flash("success_msg" , "帳號已登出")
        res.redirect("/users/login");
  })
   
})
module.exports = router;