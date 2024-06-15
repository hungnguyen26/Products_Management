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
