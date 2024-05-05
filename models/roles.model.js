

const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    nhomQuyen: {
      type: Array,
      default: []
    },  
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Roles = mongoose.model("Role", RolesSchema, "roles");

module.exports = Roles;
