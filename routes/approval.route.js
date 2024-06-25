const express = require("express");
const { approvalModal } = require("../models/approval.model");

const approvalRouter = express.Router();

approvalRouter.post("/create", async (req, res) => {
    try {
        const data = new approvalModal(req.body);
        await data.save();
        res.send("aprroval data is added")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

approvalRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await approvalModal.find({ projectId: id });
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})


approvalRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await approvalModal.findByIdAndUpdate({ _id: id }, { approvalRequired: req.body});
        res.send("note is updated")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

// approvalRouter.patch("/update/:id", async (req, res) => {
//     const { id } = req.params;
//     console.log(req.body,"req.body")
//     console.log(id,"req.body")
//     try {
//         const approvalData=await approvalModal.find({_id:id});
//         console.log(approvalData,"approvalData")
//         console.log("approvalData")
//         // const approvalObj={};
//         // if(approvalData.length>0){
//             // approvalObj={...approvalData[0]?.approvalRequired};
//             approvalData[0][approvalRequired[req.body.approvalName]]=req.body.approvalStatus
//             // for(key in approvalData[0]?.approvalRequired){

//             // }
//             console.log(approvalData,"approvalObj")
//             await approvalModal.findByIdAndUpdate({_id: id}, {approvalRequired:approvalData[0]?.approvalRequired});
//         // }

//         res.send("note is updated")
//     } catch (err) {
//         res.send({ "err": err.message })
//     }
// })

approvalRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        await approvalModal.findByIdAndDelete({ projectId: id });
        res.send("note is deleted")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

module.exports = { approvalRouter }
