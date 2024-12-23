const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authentication = require('../middleware/authentication')
const SharedAccess=require('../schemas/shared_access_schema')
const Workspace=require('../schemas/workspace_schema')
const User=require('../schemas/user_schema')
const dotenv = require('dotenv')
dotenv.config()


router.post('/',authentication,async (req,res)=>{
    const {email}=req.body
    const user=req.user

    if (!user.id) {
        return res.status(400).json({ "message": "User not logged In" })
    }

    const userObjectId=new mongoose.Types.ObjectId(user.id)

    const getWorkspace = await Workspace.findOne({owner:userObjectId})
    if (!getWorkspace) { 
        return res.status(404).json({ message: "Workspace not found" })
    } 

    const getSharedUser = await User.findOne({email})
    if (!getSharedUser) { 
        return res.status(404).json({ message: "User not exits" })
    } 
    

    try{
        const newSharedAccess=await SharedAccess.create({
            owner:user.id,
            sharedWith:[getSharedUser._id],
            workspace:getWorkspace._id
        })
        res.status(200).json(newSharedAccess)
    }catch(err){
        console.log(err)
        res.status(500).json({ "message": "Error while accesing share-workspace" })

    }
})

module.exports=router