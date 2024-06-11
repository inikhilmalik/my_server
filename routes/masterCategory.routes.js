const express=require("express");
const { MasterCategorySchemaModel } = require("../Models/masterCategory.model");

const masterCategoryRouter=express.Router();


masterCategoryRouter.post("/create",async(req,res)=>{
    try{
        await MasterCategorySchemaModel.insertMany(req.body);
        res.send("Master Category is added")
    }catch(err){
        res.send({"err":err.message})
    }
})

masterCategoryRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const data=await MasterCategorySchemaModel.find({ownerId:id});
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

// masterCategoryRouter.get("/:id",async(req,res)=>{
//     const {id}=req.params
//     // console.log(id)
//     const query = {};
//     query[`added.${id}`] = { $exists: true };
//     // console.log(query)
//     try{
//         const data=await MasterCategorySchemaModel.find(query);
//         // console.log(data)
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

// masterCategoryRouter.get("/single/:id",async(req,res)=>{
//     const {id}=req.params
//     console.log(id)
//     try{
//         const data=await MasterCategorySchemaModel.find({_id:id});
//         // console.log(data,"dddd")
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

// masterCategoryRouter.patch("/updateNote/:id",async(req,res)=>{
//     const {id}=req.params;
//     // console.log(id)
//     try{
//         await MasterCategorySchemaModel.findByIdAndUpdate({_id:id},req.body);
//         res.send("note is updated")
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

masterCategoryRouter.delete("/deleteMasterCategory/:id",async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    try{
        await MasterCategorySchemaModel.findByIdAndDelete({_id:id});
        res.send("master category is deleted")
    }catch(err){
        res.send({"err":err.message})
    }
  })

module.exports={masterCategoryRouter}
