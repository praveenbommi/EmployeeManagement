const express = require('express');
const routing = express.Router();
const dbLayer = require("../model/Test")
const jwt = require('jsonwebtoken')
var multer = require('multer');
var path = require('path');

routing.get("/setupDB", (req, res, next) => {
    dbLayer.insertScript().then((data) => {
        if (data) {
            res.status(201)
            res.json({ message: "Inserted " + data + " document in database" })
        }
    })
})

routing.get("/getUsers",(req, res, next) => {
    dbLayer.getAll().then((data) => {
        if (data) {
            // res.status(201)
            res.send(data)
        }
    }).catch((err)=>{
        next(err)
    })
})

routing.post("/getdata",(req, res, next) => {
    let userdata = req.body
    dbLayer.getAllData(userdata).then((data) => {
       
            res.send(data)
        
    }).catch((err)=>{
        next(err)
    })
})



routing.post("/register",(req,res,next)=>{
    let userData = req.body
    dbLayer.createAccount(userData).then((data) => {
        
        res.send(data)
        // let payload = { subject: data._id}
        // let token = jwt.sign(payload, 'secretKey')
        // res.send({token})
        // res.json({message:`Account Created Successfully`})
        // res.send("Account Created Successfully")
    }).catch((err) => {
        next(err)
    }) 
})

routing.post("/login",(req,res,next)=>{
    let userData = req.body
    dbLayer.LoginAccount(userData).then((data)=>{
    let payload = { subject: data._id}
        let token = jwt.sign(payload, 'secretKey')
        res.send({token})
    //   res.json({message:`Login Successfull`})
    }).catch((err)=>{
        next(err)
    })
})

routing.put("/update/:username",(req, res,next)=>{
    let username = req.params.username;
    let userData = req.body;
    dbLayer.updateUser(username,userData).then((data) => {
        // let g = JSON.stringify(data)
        // res.json({ message: "Updated User : " + data})
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

routing.delete("/delete/:username",(req, res,next)=>{
    let username = req.params.username
    
    dbLayer.deleteUser(username).then((data) => {
        // let g = JSON.stringify(data)
        res.json({ message: "Removed User : " + data})
    }).catch((err) => {
        next(err)
    })
})

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

routing.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

routing.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req._id = payload.subject
    next()
}

module.exports=routing