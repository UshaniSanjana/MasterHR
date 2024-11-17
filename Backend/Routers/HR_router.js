const express=require("express");
const Router=express.Router();
const HR=require("../Models/HR_Schema");



Router.post("/",(req,res)=>{
     const { Name, email,password,companyname,companylocation } = req.body;
     const NewHR=new HR({Name, email,password,companyname,companylocation})

     NewHR.save().then((HR)=>{
        res.status(200).json({HR})

     })
     .catch((err)=>{
        console.log(err);
          res.status(500).json({message:"Error Creating Employee"})
     })


})

module.exports=Router;