const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const File = require('../schemas/file_schema')

router.get("/createFile",(req,res)=>{
    res.send("Hello")
})

module.exports = router
