// routes/addImage-routes.js
const express = require("express");
const router = express.Router();
const postImage = require("../controllers/postImage"); // Assuming this is the correct controller
const postImagepost = require("../controllers/postImagepost");

router.get("/:userId",postImage);
router.post("/post/:userId",postImagepost);

module.exports = router;
