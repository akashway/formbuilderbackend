const mongoose=require('mongoose')

const workspaceSchema= new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
    }],
    folder:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Folder'
    }]
})

const Workspace= mongoose.model("Workspace",workspaceSchema)
module.exports=Workspace