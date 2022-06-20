// install and import express
const path = require('path')
const userJson = require(path.join(__dirname,'/assets/user.json'))
const express = require('express');
let app = express();

// Code here

app.get("/",(req,res)=>{
    try {
       
        res.status(200).sendFile(path.join(__dirname,'/assets/users.html'))
    } catch (error) {
        console.log('error:', error)
        res.send(500).send(error.message);
        
    }
})
app.get("/users",(req,res)=>{
    try {
        res.status(200).sendFile(path.join(__dirname,'/assets/user.json'))
    } catch (error) {
        console.log('error:', error)
        res.send(500).send(error.message);
        
    }
})

app.get("/users/:id", (req, res) => {
    try {
     
    const user = userJson.filter((el)=>{if(el.id==req.params.id){return el}});
        if (user.length>0) {
            res.status(200).send(user[0]);
        } else {
            res.status(404).send("No user Found");
        }
  } catch (error) {
    console.log("error:", error);
    res.send(500).send(error.message);
  }
});
app.post("/users",(req,res)=>{
    try {
        const user = userJson.create(req.body)
        res.status(200).send(user)
    } catch (error) {
        console.log('error:', error)
        res.send(500).send(error.message);
        
    }
})

app.listen(8000,async()=>{
    await console.log("listening on port 8000");
})

// Note: Do not remove this export statement
module.exports = app;
