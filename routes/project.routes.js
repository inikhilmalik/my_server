const express=require("express");
const { ProjectModal } = require("../models/project.model");


const projectRouter=express.Router();

projectRouter.post("/create",async(req,res)=>{
    try{
        const data=new ProjectModal(req.body);
        await data.save();
        res.send("project is added")
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.get("/",async(req,res)=>{
    try{
        const data=await ProjectModal.find();
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await ProjectModal.findByIdAndUpdate({_id:id},req.body);
        res.send("data is updated")
    }catch(err){
        res.send({"err":err.message})
    }
})

module.exports={projectRouter}
