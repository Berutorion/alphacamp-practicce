const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = app => {
    //midleware
    app.use(passport.initialize());
    app.use(passport.session());

    //local-strategy
    passport.use(new LocalStrategy({ usernameField: "email" }, async(email, password, done) => {
       
       try{const user = await User.findOne({ email });
       //如果帳號不存在
           if (!user) return done(null, false, { message: "這個email還沒註冊請先註冊" });
       //檢查密碼是否正確
           if (user.password != password) return done(null, false, { message: "帳號或密碼錯誤" });

           return done(null, user);

       } catch (error) {
           done(err, false);
       }
    }      
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).lean();
            done(null, user);
        } catch (error) {
            done(error, null);
        }
      
    })

}