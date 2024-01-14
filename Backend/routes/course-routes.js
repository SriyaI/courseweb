const express=require("express");
const router=express.Router();
const postImage=require("../controllers/postImage");

router.post("/addImage/:userId",postImage);

module.exports=router;