const mongoose = require("mongoose");

const picSchema = mongoose.Schema({
    images: [{ pic: String, action: Boolean }],
    projectTaskId:String,
}, {
    versionKey: false
})

const PicModal = mongoose.model("image", picSchema);

module.exports = { PicModal };