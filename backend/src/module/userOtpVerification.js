const mongoose=require('mongoose')
const userOtpSchema=new mongoose.Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date
})
module.exports=mongoose.model('userOtp',userOtpSchema)