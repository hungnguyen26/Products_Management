const Chat = require("../../models/chats.model");
const User = require("../../models/users.model");


// [GET] /chat
module.exports.index = async (req, res) => {
    const user_id = res.locals.user.id;
    // SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESS", async (content)=>{
          // khi có data thì lưu vào dbnguyenhuuhung2610@gmail.co
          const chat = new Chat({
            user_id: user_id,
            content: content
          });
          await chat.save();
        });
    });
    // END SocketIO

    // lấy ra data chat
    const chats = await Chat.find({
      deleted:false
    });

    for (const chat of chats) {
      const inforUser = await User.findOne({
        _id: chat.user_id
      }).select("fullName");
      
      chat.inforUser = inforUser;
    }


    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
      });
};
