const nodemailer=require("nodemailer")
require("dotenv").config()
const bcrypt = require("bcrypt")
const userOtpVerfication=require("..//module/userOtpVerification")

module.exports =async (id,email)=>{
    
    
    const transporter=await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASSWORD
        }
    })
  
    const otp=Math.floor(1000+Math.random()*9000)
   
    const hashOtp=await bcrypt.hashSync(otp.toString(),8)
    console.log(hashOtp)
    const newOtpVerification=await new userOtpVerfication({
        userId:id,
        otp:hashOtp,
        createdAt:Date.now(),
        expiresAt:Date.now()+ 3600000
    })
    console.log(newOtpVerification)
    await newOtpVerification.save()
   
    const info=await transporter.sendMail({
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"verify Your Email",
        text:"Verify Your Email",
        html:`<p>Enter ${otp} in the app to verify your email</p>`
    })
    
    return {
        status:200,
        message:"email sent"
    }

}