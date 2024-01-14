// routes/main-routes.js
const express = require("express");
const router = express.Router();
const getForms = require("../controllers/getForms");
const postForms = require("../controllers/postForms");

router.get("/", getForms);
router.post("/add", postForms);

module.exports = router;
