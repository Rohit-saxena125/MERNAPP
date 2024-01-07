const express = require("express");
const router = express.Router();
const admincontrol = require("../Controller/admin-controller");
const userauth = require('../middleware/userauthmiddleware');
const adminmiddleware = require('../middleware/admin-middleware');
router.route("/users").get(userauth,adminmiddleware,admincontrol.getAllUser);
router.route('/users/delete/:id').delete(userauth,adminmiddleware,admincontrol.deleteUser);
router.route('/users/:id').get(userauth,adminmiddleware,admincontrol.findUser);
router.route('/users/update/:id').patch(userauth,adminmiddleware,admincontrol.updateUser);
router.route('/contact').get(userauth,adminmiddleware,admincontrol.getAllContact);
router.route('/contact/delete/:id').delete(userauth,adminmiddleware,admincontrol.deleteContact);
router.route('/services').get(userauth,adminmiddleware,admincontrol.getAllService);
router.route('/services/delete/:id').delete(userauth,adminmiddleware,admincontrol.deleteService);
router.route('/services/:id').get(userauth,adminmiddleware,admincontrol.findService);
router.route('/services/update/:id').patch(userauth,adminmiddleware,admincontrol.updateService);
router.route('/services/create').post(userauth,adminmiddleware,admincontrol.createService);
module.exports = router;