const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectName: String,
    createdId: String,
    ownerId: String,
    added:{}
}, {
    versionKey: false
})

const ProjectModal = mongoose.model("project", projectSchema);

module.exports = { ProjectModal };