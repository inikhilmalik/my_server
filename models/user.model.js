const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    number:{type:Number},
    role:{type:String},
    ownerId: {type:String},
    type:{type:String},
  },{
    versionKey:false
}
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};
