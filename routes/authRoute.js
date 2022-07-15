const express = require("express");
const router = express.Router();

const { register, login, dashboard } = require("../controllers/authcontroller");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/dashboard").get(dashboard);

module.exports = router;