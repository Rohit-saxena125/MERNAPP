const express = require('express');
const router = express.Router();
const ContactForm = require('../Controller/contact-controller');
router.route("/contact").post(ContactForm);
module.exports = router;