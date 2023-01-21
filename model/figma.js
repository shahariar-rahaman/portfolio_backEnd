const mongoose = require('mongoose')
const {Schema} = mongoose

const figmaData=new Schema({
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
    },
    project:{
        type:[String],
        required:true
    }

})

const figma = mongoose.model("Figma",figmaData)
module.exports = figma