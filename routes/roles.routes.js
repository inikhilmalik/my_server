const express=require("express");
const { RolesModel } = require("../models/roles.model");


const rolesRouter=express.Router();

rolesRouter.post("/create",async(req,res)=>{
    try{
        const data=new RolesModel(req.body);
        await data.save();
        res.send("Roles is created")
    }catch(err){
        res.send({"err":err.message})
    }
})

rolesRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        const data=await RolesModel.find({projectId:id});
        // console.log(data)s
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

// rolesRouter.get("/single/:id",async(req,res)=>{
//     const {id}=req.params
//     console.log(id)
//     try{
//         const data=await ProjectModal.find({_id:id});
//         console.log(data,"dddd")
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

rolesRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await RolesModel.findByIdAndUpdate({_id:id},req.body);
        res.send("todo is updated")
    }catch(err){
        res.send({"err":err.message})
    }
})

rolesRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await RolesModel.findByIdAndDelete({_id:id});
        res.send("todo is deleted")
    }catch(err){
        res.send({"err":err.message})
    }
  })

module.exports={rolesRouter}
