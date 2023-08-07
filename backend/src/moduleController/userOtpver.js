const express=require("express")
const router=express.Router()
const userOtp=require("..//module/userOtpVerification")
const bcrypt=require("bcrypt")
const User=require("..//module/user")
const sendOtpEmail=require("..//utlies/SendMail")

router.post("/verifyOtp",async (req,res)=>{
    try{
        let {userId,otp}=req.body
        if(!userId || !otp){
            throw new Error("empty otp details are not allowed")
        }
        let userData=await userOtp.find({userId:userId})
        
        if(userData.length <=0){
            throw new Error(" Account record does not exist or has been verified please sign in again")

        }
        else{
            const {expiresAt}=userData[0]
            const hashotp=userData[0].otp
            if(expiresAt <Date.now()){
                await userOtp.deleteMany({userId})
                throw new Error("OTP has expired")
                
            }
            else{

                let chechedOtp=await bcrypt.compareSync(otp,hashotp)
                if(!chechedOtp){
                    throw new Error("Invalid OTP please check inbox")
                }
                else{
                    await User.updateOne({_id:userId},{verify:true})
                    userOtp.deleteMany({userId:userId})
                    res.status(200).send({status:"Verified",message:"User email verified successfully"})

                }

                

            }
            
            
            
        }
        
        


    }
    catch(err){
        return res.status(400).send(err)

    }
    
})
router.post("/resendOtp",async (req,res)=>{
    try{
        const {userId,email}=req.body
        if(!userId || !email){
            throw new Error("empty user details are not allowed")
        }
        else{
            await userOtp.deleteMany({userId:userId})
            let data=await sendOtpEmail(userId,email)
            return res.status(200).send({status:"success",message:"Otp sent successfully"})
        }

    }
    catch(err){
        return res.status(400).send({status:"error",message:"Something went wrong"})
    }
})
module.exports=router