const mongoose=require('mongoose')


const sharedAccessSchema= new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sharedWith:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    workspace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workspace'
    },
    accessType:{
        type:String,
        enum:['view','edit'],
        default:'view'
    },
    accessLink:{
        type:String,
        default:null
    }

})

const SharedAccess=mongoose.model('SharedAccess',sharedAccessSchema)
module.exports=SharedAccess