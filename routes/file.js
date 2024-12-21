const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authentication = require('../middleware/authentication')
const dotenv = require('dotenv')
dotenv.config()

const File = require('../schemas/file_schema')
const Folder = require('../schemas/folder_schema')


router.get("/", authentication, async (req, res) => {
    const { foldername } = req.query
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

    const folder = await Folder.findOne({ folderName, user: userObjectId })
    const isFileNameExists = await File.findOne({ fileName })

    if (!folder) {
        return res.status(403).json({ message: 'User does not have permission to add files to this folder' });
    }

    if (fileName === "" || folderName === "" || fileName == undefined || folderName == undefined) {
        return res.status(400).json({ "message": "Folder or file name can't be empty" })
    }

    if (isFileNameExists) {
        return res.status(400).json({ "message": "Folder ax`lready exist" })
    }

    try {
        const file = await File.create({
            fileName,
            folder: folder.id
        })
        res.status(200).json(file)
    } catch (err) {
        res.status(400).json({ "message": "Error while adding file" })
    }
})

module.exports = router
