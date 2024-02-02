const express = require("express");
const { RatelistModal } = require("../models/ratelist.model");


const rateListRouter = express.Router();

rateListRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    console.log(id,"pp")

    try {
        const data = await RatelistModal.find({adminId:id});
        console.log(data,"pp")
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})


rateListRouter.post("/create",async(req,res)=>{
    console.log(req.body)
    try{
        const data=new RatelistModal(req.body);
        await data.save();
        res.send("ratelist is created")
    }catch(err){
        res.send({"err":err.message})
    }
})

rateListRouter.patch("/updateRateList/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        await RatelistModal.findByIdAndUpdate({ _id: id }, req.body);
        res.send("ratelist is updated")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

module.exports = { rateListRouter }