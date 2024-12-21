const mongoose=require('mongoose')

const folderSchema=new mongoose.Schema({
    folderName:{
        type:"String",
        unique:true,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Folder= new mongoose.model('Folder',folderSchema)


module.exports= Folder
