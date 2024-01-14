// routes/loggedIn-routes.js
const express = require("express");
const router = express.Router();
const logInForms = require("../controllers/logInForms");

router.post("/add-loggedin", logInForms);

module.exports = router;
