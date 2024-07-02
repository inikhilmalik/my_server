const express = require("express");
const { NoteNotificationModal } = require("../models/noteNotification");

const noteNotificationRouter = express.Router();

noteNotificationRouter.post("/create", async (req, res) => {

    try {
        await NoteNotificationModal.insertMany(req.body);
        res.send("note is added")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

noteNotificationRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await NoteNotificationModal.find({ projectId: id });
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})


noteNotificationRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        await NoteNotificationModal.findByIdAndUpdate({ _id: id }, req.body);
        res.send("note is updated")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

noteNotificationRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id,"opopp}}}}")
    try {
        await NoteNotificationModal.findByIdAndDelete({ _id: id });
        res.send("note notification is deleted")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

module.exports = { noteNotificationRouter }
