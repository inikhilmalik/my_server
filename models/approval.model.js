const mongoose = require("mongoose");

const approvalSchema = mongoose.Schema({
    projectId:String,
    approvalRequired:{}
}, {
    versionKey: false
})

const approvalModal = mongoose.model("approval-require", approvalSchema);

module.exports = { approvalModal };