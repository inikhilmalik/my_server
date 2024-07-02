const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    name: String,
    date: String,
    itemId:String,
    projectId:String,
    note:String,
    createdBy:String,
}, {
    versionKey: false
} )

const NoteModal = mongoose.model("note", noteSchema);

module.exports = { NoteModal };