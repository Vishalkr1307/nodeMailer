const express = require('express');
const app= express();
const Register=require("./moduleController/register")
const UserOtp=require("./moduleController/userOtpver")

app.use(express.json())
app.use("/register",Register)
app.use("/user",UserOtp)




module.exports=app
