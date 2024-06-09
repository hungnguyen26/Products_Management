const { Socket } = require("socket.io");

// [GET] /chat
module.exports.index = async (req, res) => {
    // SocketIO
    _io.on('connection', (socket) => {
      console.log('a user connected',socket.id);
    
    });
    // END SocketIO


    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
      });
};
