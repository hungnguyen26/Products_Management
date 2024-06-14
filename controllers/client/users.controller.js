const User = require("../../models/users.model")

// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;

    const users = await User.find({
        _id: {$ne:userId},     // trừ userId đã tồn tại
        deleted:false,
        status:"active"
    }).select("avatar fullName")


    // console.log(users);
    res.render("client/pages/users/not-friend.pug", {
      pageTitle: "Danh sách người dùng",
      users:users
    });
  };