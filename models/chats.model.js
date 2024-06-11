const mongoose = require("mongoose");

const chatschema = new mongoose.Schema(
  {
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
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
const Chat = mongoose.model("Chat", chatschema, "chats");

module.exports = Chat;