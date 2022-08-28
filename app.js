const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const methodOverride = require("method-override");
const session = require("express-session");
const restRoute = require("./routes/index").rest;
const pageRoute = require("./routes/index").page;
const apiRoute = require("./routes/index").api;
const userRoute = require("./routes/index").users;
const { authenticate } = require("./middlewares/auth");
const flash = require("connect-flash");
require("dotenv").config();
require("./config/mogoose");


//set view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//set static file
app.use(express.static("public"));
//body-parser
app.use(express.urlencoded({ extended: true }));
//add method-override
app.use(methodOverride("_method"));

//set express-session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}))
//use passport 
require("./config/passport")(app);
//use connect-flash
app.use(flash());

//set res.locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticate = req.isAuthenticated();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
})

//Listen server
app.listen(port, () => {
  console.log("Server is working");
});
//Route
app.use("/restaurants",authenticate, restRoute);
app.use("/page",authenticate, pageRoute);
app.use("/api",authenticate, apiRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});
