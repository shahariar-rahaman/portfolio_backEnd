const mongoose = require('mongoose')
const {Schema} = mongoose

const reactData=new Schema({
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

const react = mongoose.model("React",reactData)
module.exports = react