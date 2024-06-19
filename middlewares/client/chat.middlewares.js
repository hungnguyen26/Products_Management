const RoomChat = require("../../models/rooms-chat.model");

module.exports.isAccess = async (req,res, next)=>{
    const userId = res.locals.user.id;
    const idRoomChat = req.params.idRoomChat;

    // console.log(userId);
    // console.log(idRoomChat);
    
    try {
        const isAccessRoomChat = await RoomChat.findOne({
            _id: idRoomChat,
            "users.user_id":userId,
            deleted:false
        })
    
        if(isAccessRoomChat){
            next();
        }else{
            res.redirect("/");
        }
    } catch (error) {
        res.redirect("/");
    }

    
}