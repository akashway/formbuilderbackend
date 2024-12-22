const mongoose=require('mongoose')

const folderSchema=new mongoose.Schema({
    folderName:{
        type:"String",
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Folder= new mongoose.model('Folder',folderSchema)


module.exports= Folder
