
module.exports = {
    authenticate: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash("warning_msg", "請先進行登入");
            res.redirect("/users/login");
        }
    }
};
