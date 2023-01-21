const mongoose = require('mongoose')
const {Schema} = mongoose

const blogData = new Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
        
})

const blog = mongoose.model("Blog",blogData)
module.exports=blog