const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    FriendsList: [        // chứa ds bạn bè đã kết bạn
      {
        user_id: String,
        room_chat_id: String
      }
    ],
    acceptFriends: Array,         // ds những người đã gửi yêu cầu cho cta
    requestFriends: Array,        // ds những người mình đã gửi yêu cầu cho họ
    statusOnline: String,
    status:{    
        type: String,
        default:"active"
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
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
