const express = require('express')
const router = express.Router()
const authentication = require('../middleware/authentication')
const dotenv = require('dotenv')
dotenv.config()

const Folder = require('../schemas/folder_schema')
const File = require('../schemas/file_schema')


router.get("/", authentication, async (req, res) => {
    const user = req.user
    const userId = user.id

    if (!userId) {
        return res.status(400).json({ "message": "User not logged In" })
    }

    const folderListOfCurrentUser = await Folder.find({ user: userId })
    res.status(200).json(folderListOfCurrentUser)
})


router.post("/", authentication, async (req, res) => {
    const { fileName } = req.body

    if (fileName === "" || fileName == undefined) {
        return res.status(400).json({ "message": "Folder can't be empty or undefined" })
    }

    const isFileExist=await File.findOne({fileName})

    if (isFileExist) {
        return res.status(400).json({ "message": "File already exist" })
    }

    try {
        const file = await File.create({
            fileName,
            user: req.user.id
        })
        res.status(200).json(file)
    } catch (err) {
        res.status(500).json({ "message": "Error while adding file" })
    }

})


router.post("/addfolder", authentication, async (req, res) => {
    const { folderName } = req.body
    const isFolderExist = await Folder.findOne({ folderName })
    console.log(folderName, "folderName")

    if (folderName === "" || folderName == undefined) {
        return res.status(400).json({ "message": "Folder can't be empty" })
    }

    if (isFolderExist) {
        return res.status(400).json({ "message": "Folder already exist" })
    }

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

})

module.exports = router

