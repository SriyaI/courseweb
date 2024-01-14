const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const courseDataSchema=new Schema({
    courseName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    header:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
    
}
);

module.exports=mongoose.model("CourseData",courseDataSchema,"courseData");