const Chat = require("../../models/chats.model");
const User = require("../../models/users.model");


// [GET] /chat
module.exports.index = async (req, res) => {
    const user_id = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    // SocketIO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESS", async (data)=>{
          console.log(data.imgs);
          // khi có data thì lưu vào db
          const chat = new Chat({
            user_id: user_id,
            content: data.content,
            images: data.imgs
          });
          await chat.save();

          // trả data về client
          _io.emit("SERVER_RETURN_MESS",{
            userId: user_id,
            fullName: fullName,
            data: data
          });
        });

        socket.on("CLIENT_SEND_TYPING",(type)=>{
          socket.broadcast.emit("SERVER_RETURN_TYPING",{
            userId: user_id,
            fullName: fullName,
            type: type
          })
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
