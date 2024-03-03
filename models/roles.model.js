const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema(
  {
    ownerId:{type:String},
    permissions:{}
  },{
    versionKey:false
}
);

const RolesModel = mongoose.model("role", rolesSchema);

module.exports = {RolesModel};
