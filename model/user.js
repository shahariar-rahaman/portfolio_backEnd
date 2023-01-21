const mongoose = require('mongoose');
const {Schema} = mongoose

const adminSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        is_admin:{
            type:Boolean,
            default: false,
        }


}) 
const adminData = mongoose.model("admin",adminSchema);
module.exports = adminData