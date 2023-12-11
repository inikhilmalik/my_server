const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: String,
    status: String,
    projectId: String,
    taskDate: String,
}, {
    versionKey: false
})

const TodoModel = mongoose.model("data", todoSchema);

module.exports = { TodoModel };