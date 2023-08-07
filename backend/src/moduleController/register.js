const express=require("express")
const router=express.Router()
const User=require("..//module/user")
const userOtpVer=require("..//utlies/SendMail")

router.post("",async (req,res)=>{
    try{
        let user=await User.create(req.body)
        // console.log(user._id.toString())
        let data=await userOtpVer(user._id.toString(),req.body.email)
        
        
        
         
        return res.status(200).send(data)

    }
    catch(err){
        return res.status(500).send(err)

    }
})
router.get("",async (req,res)=>{
    try{
            let user=await User.find()
            return res.status(200).send(user)
    
        }
    catch(err){
        return res.status(500).send(err)

    }
})
module.exports = router