const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authentication = require('../middleware/authentication')
const dotenv = require('dotenv')
dotenv.config()

const File = require('../schemas/file_schema')
const Folder = require('../schemas/folder_schema')
const Workspace=require('../schemas/workspace_schema')



router.get("/", authentication, async (req, res) => {

    const userId = req.user.id

    if (!userId) {
        return res.status(400).json({ "message": "User not logged In" })
    }

    const fileListOfCurrentUser = await File.find({ user: userId,folder:null })
    res.status(200).json(fileListOfCurrentUser)
})


router.get("/:foldername", authentication, async (req, res) => {
    const { foldername } = req.params
    const user = req.user
    const userId = user.id

    if (!userId) {
        return res.status(400).json({ "message": "User not logged In" })
    }

    const userObjectId = new mongoose.Types.ObjectId(userId)
    const folder = await Folder.findOne({ folderName: foldername, user: userObjectId })

    if (!folder) {
        return res.status(400).json({ message: 'No such folder exits' });
    }
    const folderObjectId = new mongoose.Types.ObjectId(folder.id)


    const fileList = await File.find({ folder: folderObjectId })
    res.status(200).json(fileList)
})

router.post("/addfile", authentication, async (req, res) => {
    const { fileName, folderName } = req.body
    const userObjectId = new mongoose.Types.ObjectId(req.user.id)

    let folder=null

    if(folderName){
        folder = await Folder.findOne({ folderName, user: userObjectId })
        if (!folder) {
            return res.status(403).json({ message: 'User does not have permission to add files to this folder' });
        }

    }

    const isFileNameExists = await File.findOne({ fileName,folder:folder?folder._id:null})

    if (fileName === "" || fileName == undefined) {
        return res.status(400).json({ "message": "File name can't be empty" })
    }

    if (isFileNameExists) {
        return res.status(400).json({ "message": "File name already exist" })
    }
    
    try {
        const file = await File.create({
            fileName,
            folder: folder?folder._id:null,
            user:req.user.id
        })
         let workspace=await Workspace.findOne({owner:req.user.id})
                if(!workspace){
                    workspace=new Workspace({owner:req.user.id,files:[],folder:[]})
                }
                if(!folder){
                    workspace.files.push(file._id)
                    await workspace.save()
                }
        res.status(200).json(file)
    } catch (err) {
        if (err.code === 11000) { 
            console.log(err)
            return res.status(400).json({ message: 'File with the same name already exists in this folder' })
        }
        res.status(500).json({ "message": "Error while adding file" })
    }
})

module.exports = router
