const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    fileName:{
        type:String,
        unique:true,
        require:true
    },
    folder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Folder'
    }
})

const File= new mongoose.model('File',fileSchema)


module.exports= File