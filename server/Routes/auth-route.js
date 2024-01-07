const express = require("express");
const router = express.Router();
const autcontroller = require("../Controller/auth-controller");
const validate = require("../middleware/validatormiddle");
const {Userchema,Loginchema} = require("../validators/auth-validator");
const userauthmiddleare = require("../middleware/userauthmiddleware");
router.route("/register").post(validate(Userchema),autcontroller.Register);
router.route("/login").post(validate(Loginchema),autcontroller.Login);
router.route("/user").get(userauthmiddleare,autcontroller.UserData)
module.exports = router;