const controller = require("../controllers/auth.controller");
const router = require('express').Router();


router.post("/auth/signup", controller.signup); //signup new employee
router.post("/auth/signin", controller.signin); //login employee
router.get("/auth/refresh-token", controller.refreshToken); //refresh token


module.exports = router;