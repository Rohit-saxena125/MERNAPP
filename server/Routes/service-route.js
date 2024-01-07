const express = require("express");
const router = express.Router();
const service = require("../Controller/service-controller")
router.route("/service").get(service);
module.exports = router;