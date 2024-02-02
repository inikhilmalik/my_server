const mongoose = require("mongoose");

const ratelistSchema = mongoose.Schema({
    adminId:String,
    rateList:{}
}, {
    versionKey: false
})

const RatelistModal = mongoose.model("ratelist", ratelistSchema);

module.exports = { RatelistModal };