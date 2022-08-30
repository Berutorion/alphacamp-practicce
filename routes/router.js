const restRoute = require("./restaurant");
const pageRoute = require("./page");
const apiRoute = require("./api");
const userRoute = require("./users");
const authRoute = require("./auth");
const { authenticate } = require("../middlewares/auth");
const router = require("express").Router();

router.use("/restaurants",authenticate, restRoute);
router.use("/page",authenticate, pageRoute);
router.use("/api",authenticate, apiRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;