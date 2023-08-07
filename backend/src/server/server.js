const app=require("..//index")
const connect=require("..//config/db")
require("dotenv").config()

const port=process.env.PORT||3000

app.listen(port,async ()=>{
    await connect()
    console.log(`Server is running on port ${port}`)
})