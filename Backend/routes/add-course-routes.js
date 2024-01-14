const express=require("express");
const router=express.Router();

const postCourse=require("../controllers/postCourse");
const CourseData=require("../model/CourseData");
const getCourse=require("../controllers/getCourse")

router.post("/",postCourse);
router.get("/",getCourse);



module.exports=router;