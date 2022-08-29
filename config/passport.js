const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = app => {
    //midleware
    app.use(passport.initialize());
    app.use(passport.session());

    //local-strategy
    passport.use(new LocalStrategy({ usernameField: "email" , passReqToCallback: true}, async(req,email, password, done) => {
       
       try{const user = await User.findOne({ email });
       //如果帳號不存在
           if (!user) return done(null, false,req.flash("warning_msg","這個email還沒註冊請先註冊" ));
       //檢查密碼是否正確
           const isMatch = await bcrypt.compare(password, user.password);
           if (isMatch) {
               return done(null, user ,req.flash("success_msg" , "已經成功登入"));
           } else {
               return done(null, false ,req.flash("warning_msg" , "帳號或密碼錯誤"));
           }

       } catch (error) {
           done(err, false);
       }
    }      
    ))

    passport.use(new FacebookStrategy({
        clientID:process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.CALLBACKURL,
        profileFields: ['displayName', 'email'],
        passReqToCallback: true
      },
        async (req, accessToken, refreshToken, profile, done) => {
            const { name, email } = profile._json;
            try {
                //確認email是否存在
                const user = await User.findOne({ email });
                if (user) {
                    //存在
                    req.flash("success_msg","登入成功")
                    return done(null, user);
                } else {
                    //不存在，寫入資料庫
                    const randomPassword = Math.random().toString(36).slice(-8);
                    const hash = await bcrypt.hash(randomPassword, await bcrypt.genSalt(10));
                    const user = await User.create({ name, email, password: hash });
                    req.flash("success_msg","登入成功")
                    return done(null, user);
                }
            } catch (error) {
                return done(error, false);
           }
      }
    ));

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