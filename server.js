const mongoose = require('mongoose');
const express = require('express');
const multer  = require('multer');
const asyncHandler = require('express-async-handler')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');
const userSchema = require('./model/user.js')
const blogData = require("./model/blogEdit.js")
const figma = require("./model/figma.js")
const react = require("./model/reactPost.js")
const basic = require("./model/basic.js")
const PORT = process.env.PORT || 5000;
var app = express()
app.use(express.json())
app.use(cors())
app.use(cors({origin:['http://localhost:3000', 'https://portfolio-front-end-delta.vercel.app']}));
 
mongoose.connect('mongodb+srv://Shahariar2112:ridaybabu7635@cluster0.l8cbdhl.mongodb.net/Prortfolio?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected successfully")).catch((err) => console.log("it has an error", err));

 
app.post('/registration',async (req, res)=>{
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    const admin = {
      name:req.body.name,
      email:req.body.email,
      password:hash,
      is_admin:req.body.is_admin
    }
    const adminObj = new userSchema(admin)
    adminObj.save()
});
  })
app.post('/login',async (req,res)=>{
    const data = await userSchema.find({email:req.body.email});
    if(data[0]){
      bcrypt.compare(req.body.password, data[0].password, function(err, result) {
        if(result)
        res.send({userInfo:data[0],msg:"Login Successful"})
    });
    }

  })
  app.post("/blogPost",(req,res)=>{
    const blogEditData = {
      id:req.body.id,
      title:req.body.title,
      name:req.body.name,
      description:req.body.description,
      image:req.body.image
    }
    const blog = new blogData(blogEditData)
    blog.save()

  })
  app.get("/blogPost",async (req,res)=>{
    let data = await blogData.find({})
    res.send(data)
  })
  app.get("/blogPOst/:id",async (req,res)=>{
    let data = await blogData.findById(req.params.id)
    res.send(data)
  })
  app.put("/blogPost/:id",async (req,res)=>{
    let data = await blogData.findByIdAndUpdate(req.params.id,{id:req.body.id,title:req.body.title,description:req.body.description,image:req.body.image})
    res.send(data);
  })
  app.delete("/blogPost/:id",async function(req,res){
  try{
    const data = await blogData.findByIdAndDelete(req.params.id); 
    res.send(data)
  }
  catch(err){

  }
  })
  
  app.post("/figmaPost",(req,res)=>{
    const figmaData = {
      title:req.body.title,
      description:req.body.description,
      link:req.body.link,
      image:req.body.image,
      project:req.body.project
    }
    const figmaDetails = new figma(figmaData)
    figmaDetails.save()
    console.log(figmaDetails)
  })
  app.get("/figmaPost",async (req,res)=>{
    const data = await figma.find({})
    res.send(data)
  })
  
  
  app.post("/reactPost",(req,res)=>{
    const reactData = {
      title:req.body.title,
      description:req.body.description,
      link:req.body.link,
      image:req.body.image,
      project:req.body.project
    }
    const reactDetails = new react(reactData)
    reactDetails.save()
  
  })
  app.get("/reactPost",async (req,res)=>{
    const data = await react.find({})
    res.send(data)
  })
  
  
  
  app.post("/basicPost",(req,res)=>{
    const basicData = {
      title:req.body.title,
      description:req.body.description,
      link:req.body.link,
      image:req.body.image,
      project:req.body.project
    }
    const basicDetails = new basic(basicData)
    basicDetails.save()
  })
  app.get("/basicPost",async (req,res)=>{
    const data = await basic.find({})
    res.send(data)
  })
app.get("/",async (req,res)=>{
  res.send("welcome to API")
})
  
//Comment Image upload

const upload = multer();
    
    app.post('/upload', upload.single('file'), asyncHandler(
      async (req, res) => {
          cloudinary.config({
              cloud_name: 'drzqify5h',
              api_key: "953421457168317",
              api_secret: "lsFL5q3c_2pE4cMz6l8w1mXaIMM",
            });
            const streamUpload = (req) => {
              return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                });
                streamifier.createReadStream(req.file.buffer).pipe(stream);
              });
            };
            const result = await streamUpload(req);
          res.status(201).json(result)
      }
  ))
  
  app.listen(PORT, () => { console.log(`Server is running at ${PORT}`) })
