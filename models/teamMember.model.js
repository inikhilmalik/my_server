const mongoose = require("mongoose");

const teamMemberSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    number:{type:Number},
    role:{type:String},
    ownerId:{type:String},
    permissions:[]
  },{
    versionKey:false
}
);

const TeamMemberModel = mongoose.model("team", teamMemberSchema);

module.exports = {TeamMemberModel};
