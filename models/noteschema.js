const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    color:{
        type:String,
        require:true
    },
    back:{
        type:String,
        require:true
    },
    Createddate:{
       type:Date,
       default:Date.now()
    },
    LastUpdated:{
        type:Date,
       default:Date.now()
    }
})

const notes = mongoose.model('note' , noteSchema)
module.exports=notes