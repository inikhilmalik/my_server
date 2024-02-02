const mongoose = require("mongoose");

const picSchema = mongoose.Schema({
    image: String,
    fileName:String,
    projectTaskId:String,
    postedDate:String,
    approvedDate:String,
    version:Number
}, {
    versionKey: false
})

const PicModal = mongoose.model("image", picSchema);

module.exports = { PicModal };