const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authentication = require('../middleware/authentication')
const Folder = require('../schemas/folder_schema')
const dotenv = require('dotenv')
dotenv.config()




router.get("/searchfolder",authentication,async(req,res)=>{
    const user = req.user
    const userId=user.id
    const folderListOfCurrentUser=await Folder.find({user:userId})
    res.status(200).json(folderListOfCurrentUser)
})


router.post("/addfolder", authentication, async (req, res) => {
    const { folderName } = req.body

    const isFolderExist = await Folder.findOne({ folderName })
    console.log(isFolderExist)
    if (isFolderExist) {
        res.status(400).json({ "message": "Folder already exist" })
    }

    else {
        try {
            const user = req.user
            const folder = await Folder.create({
                folderName,
                user: user.id
            })
            res.status(200).json(folder)
        } catch (err) {
            res.status(500).json({ "message": "Error while adding Folder" })
        }
    }
})

module.exports = router
