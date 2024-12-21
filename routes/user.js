const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const User = require('../schemas/user_schema')


router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    const isEmailExist = await User.findOne({ email })

    if (isEmailExist) {
        res.status(400).json({ "message": "User already exist" })
    }

    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            })
            res.status(200).json({ "message": "User created successfully" })

        } catch (err) {
            res.status(500).json({ "message": "Error while creating user" })
        }
    }
})


router.post("/login",async (req,res)=>{
    const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
            res.status(400).json({"message":"Username or Password incorrect"})
        }


        const isPasswordCorrect= await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            res.status(400).json({"message":"Username or Password incorrect"})
        }

        const payload={
            id:user._id
        }

        const token= jwt.sign(payload,process.env.JWT_SECRET)
        res.status(200).json({token})

})


module.exports=router