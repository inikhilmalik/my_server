const mongoose = require("mongoose");

const noteNotificationSchema = mongoose.Schema({
    itemId:String,
    noteId:String,
    projectId:String,
    read:Boolean,
    status:String,
    taggedUserName:String,
    taggedUserId:String,
}, {
    versionKey: false
} )

const NoteNotificationModal = mongoose.model("noteNotification", noteNotificationSchema);

module.exports = { NoteNotificationModal};