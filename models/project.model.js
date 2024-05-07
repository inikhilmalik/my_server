const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectName: String,
    createdId: String,
    ownerId: String,
    added: {},
    isTemplate: Boolean,
    isArchive: Boolean,
    projectType:String,
    floors:Number,
    shellType:String
}, {
    versionKey: false
})

const ProjectModal = mongoose.model("project", projectSchema);

module.exports = { ProjectModal };