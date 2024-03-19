const express=require("express");
const { NoteModal } = require("../models/notes.model");

const noteRouter=express.Router();

noteRouter.post("/create",async(req,res)=>{
    try{
        const data=new NoteModal(req.body);
        await data.save();
        res.send("note is added")
    }catch(err){
        res.send({"err":err.message})
    }
})

noteRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const data=await NoteModal.find({itemId:id});
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

// noteRouter.get("/:id",async(req,res)=>{
//     const {id}=req.params
//     // console.log(id)
//     const query = {};
//     query[`added.${id}`] = { $exists: true };
//     // console.log(query)
//     try{
//         const data=await NoteModal.find(query);
//         // console.log(data)
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

// noteRouter.get("/single/:id",async(req,res)=>{
//     const {id}=req.params
//     console.log(id)
//     try{
//         const data=await NoteModal.find({_id:id});
//         // console.log(data,"dddd")
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

noteRouter.patch("/updateNote/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await NoteModal.findByIdAndUpdate({_id:id},req.body);
        res.send("note is updated")
    }catch(err){
        res.send({"err":err.message})
    }
})

noteRouter.delete("/deleteNote/:id",async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    try{
        await NoteModal.findByIdAndDelete({_id:id});
        res.send("note is deleted")
    }catch(err){
        res.send({"err":err.message})
    }
  })

module.exports={noteRouter}
