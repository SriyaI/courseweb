const Form=require("../model/Form")

const getForms= async (req,res,next)=>{
    let forms;
    try{
        forms=await Form.find();
    }catch(err){
        console.log(err);
    }

    if(!forms){
        return res.status(404).json({message:"Not found"});
    }

    return res.status(200).json({forms});
}

module.exports=getForms;