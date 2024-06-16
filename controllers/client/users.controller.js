const User = require("../../models/users.model");

const userSocket = require("../../sockets/client/users.socket");

// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {
  // socket
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } }, 
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } },
    ],
    deleted: false,
    status: "active",
  }).select("avatar fullName");

  // console.log(users);
  res.render("client/pages/users/not-friend.pug", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

// [GET] /user/request
module.exports.request = async (req, res) => {
  // socket
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;
  const myUserId = await User.findOne({
    _id: userId
  })

  const requestFriends = myUserId.requestFriends;

  const users = await User.find({
    _id: { $in: requestFriends},
    deleted:false,
    status:"active"
  }).select("id avatar fullName");

  res.render("client/pages/users/request.pug", {
    pageTitle: "Lời mời đã gửi",
    users:users
  });
};

// [GET] /user/accept
module.exports.accept = async (req, res) => {
  // socket
  userSocket(res);
  // end socket
  
  const userId = res.locals.user.id;
  const myUserId = await User.findOne({
    _id: userId
  })

  const acceptFriends = myUserId.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends},
    deleted:false,
    status:"active"
  }).select("id avatar fullName");

  res.render("client/pages/users/accept.pug", {
    pageTitle: "Lời mời đã nhận",
    users:users
  });
};