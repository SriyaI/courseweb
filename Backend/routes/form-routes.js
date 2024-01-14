const express=require("express");
const router=express.Router();
const getForms=require("../controllers/getForms");
const postForms=require("../controllers/postForms");
const Form=require("../model/Form");
const logInForms=require("../controllers/logInForms");
const postImage=require("../controllers/postImage");
const postImagepost=require("../controllers/postImagepost")

router.get("/",getForms);
router.post("/add",postForms);
router.post("/add-loggedin",logInForms);


module.exports=router;