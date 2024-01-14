const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const courseSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    inMyCourse:{
        type:Boolean,
        required:true
    }
}
);

module.exports=mongoose.model("Course",courseSchema,"courses");