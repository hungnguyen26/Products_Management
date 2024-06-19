const User = require("../../models/users.model");
const Roomchat = require("../../models/rooms-chat.model");

// [GET] /rooms-chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    const listRoomChat = await Roomchat.find({
        "users.user_id": userId,
        typeRoom:"group",
        deleted:false,

    })
    res.render("client/pages/rooms-chat/index.pug", {
        pageTitle: "Danh sách phòng chat",
        listRoomChat:listRoomChat
      });
};

// [GET] /rooms-chat/create
module.exports.create = async (req, res) => {
    const FriendsList = res.locals.user.FriendsList;
    for (const friend of FriendsList) {
        const infoFriend = await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar");

        friend.infoFriend = infoFriend
    }
    res.render("client/pages/rooms-chat/create.pug", {
        pageTitle: "Tạo phòng chat",
        FriendsList: FriendsList
      });
};

// [POST] /rooms-chat/create
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    let dataChat = {
        title:title,
        typeRoom:"group",
        users: [],
    };

    usersId.forEach(userId=>{
        dataChat.users.push({
            user_id:userId,
            role: "user"
        })
    })

    dataChat.users.push({
        user_id:res.locals.user.id,
        role: "superAdmin"
    })

    const room = new Roomchat(dataChat);
    await room.save();

    res.redirect(`/chat/${room.id}`);
};
