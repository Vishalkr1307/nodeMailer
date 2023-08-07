const mongoose=require("mongoose")
require("dotenv").config()

module.exports=()=>{
    return mongoose.connect(process.env.DB).then(()=>console.log("Connect success to Mongoose")).catch(()=>console.log("Connect failure"))
}