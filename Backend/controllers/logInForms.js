const Form=require("../model/Form")

const logInForms= async (req,res,next)=>{
    const {userName,password}=req.body;
    let form;
    try{
        form=new Form({
            userName,
            password
        }
        )
        await form.save();
    }catch(err){
        console.log(err);
    }

    if(!form){
        return res.status(500).json({message:"Not found"});
    }

    return res.status(201).json({form});
}

module.exports=logInForms;