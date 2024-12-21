const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
dotenv.config()

const app=express()
const PORT= process.env.PORT || 3000
const userRouter=require('./routes/user')



app.get("/",(req,res)=>{
    res.json({
        "message":"Welcome to backend of Form Buider"
    })
})

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/api/user",userRouter)


app.listen(PORT,(err)=>{
    if(err){
        console.log("Some error occured")
    }
    else{
        console.log(`Server running on port ${PORT}`)
        console.log(process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(()=>console.log("MongoDb connected"))
        .catch((err)=>console.log(err))
    }
})