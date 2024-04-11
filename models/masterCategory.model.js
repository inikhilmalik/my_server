const mongoose = require("mongoose");

const masterCategorySchema = mongoose.Schema(
  {
    category:  { type: String },
    activity:[],
    ownerId:{type:String},
  },{
    versionKey:false
}
);

const MasterCategorySchemaModel = mongoose.model("master-category", masterCategorySchema);

module.exports = {MasterCategorySchemaModel};
