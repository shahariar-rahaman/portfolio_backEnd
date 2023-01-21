const mongoose = require('mongoose')
const {Schema} = mongoose

const basicData=new Schema({
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

const basic = mongoose.model("Basic",basicData)
module.exports = basic