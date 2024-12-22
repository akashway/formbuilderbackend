const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    fileName:{
        type:String,
        require:true
    },
    folder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Folder',
        default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
})

fileSchema.index({ fileName: 1, folder: 1 }, { unique: true})

const File= new mongoose.model('File',fileSchema)

module.exports= File