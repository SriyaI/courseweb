const CourseData=require("../model/CourseData")

const getCourse= async (req,res,next)=>{
    let forms;
    try{
        forms=await CourseData.find();
    }catch(err){
        console.log(err);
    }

    if(!forms){
        return res.status(404).json({message:"Not found"});
    }

    return res.status(200).json({forms});
}

module.exports=getCourse;