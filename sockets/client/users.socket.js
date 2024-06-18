const Users = require("../../models/users.model");
const RoomChat = require("../../models/rooms-chat.model");

module.exports = async (res)=>{
    _io.once('connection', (socket) => {

        // người dùng  gửi yêu cầu kết bạn
        socket.on("CLIENT_ADD_FRIEND", async (userId)=>{
            const myUserId = res.locals.user.id;

            // console.log(myUserId);  // ID của A
            // console.log(userId);    // ID của B

            // thêm id của A vào acceptFriends của B
            const existUserAinB = await Users.findOne({
                _id:userId,
                acceptFriends: myUserId
            });
            if(!existUserAinB){
                await Users.updateOne({
                    _id: userId
                },{
                    $push: { acceptFriends : myUserId}
                });
            }
            // thêm id của B vào requestFriends của A
            const existUserBinA = await Users.findOne({
                _id:myUserId,
                requestFriends: userId
            });
            if(!existUserBinA){
                await Users.updateOne({
                    _id: myUserId
                },{
                    $push: { requestFriends : userId}
                });
            }

            // lấy độ dài acceptFriends của B trả về cho B
            const infoUserB = await Users.findOne({
                _id: userId
            });
            const lengthAcceptFriends =  infoUserB.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPTFRIEND",{
                userId:userId,
                lengthAcceptFriends:lengthAcceptFriends,
            });

            // lấy thông tin của A trả về cho B
            const infoUserA = await Users.findOne({
                _id:myUserId
            }).select("id avatar fullName");

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPTFRIEND",{
                userId:userId,
                infoUserA:infoUserA,
            });
        });

        // người dùng HỦY gửi yêu cầu kết bạn   
        socket.on("CLIENT_CANCEL_FRIEND", async (userId)=>{
            const myUserId = res.locals.user.id;

            // console.log(myUserId);  // ID của A
            // console.log(userId);    // ID của B

            // Xóa id của A trong acceptFriends của B
            const existUserAinB = await Users.findOne({
                _id:userId,
                acceptFriends: myUserId
            });
            if(existUserAinB){
                await Users.updateOne({
                    _id: userId
                },{
                    $pull: { acceptFriends : myUserId}          
                });
            }
            // Xóa id của B trong requestFriends của A
            const existUserBinA = await Users.findOne({
                _id:myUserId,
                requestFriends: userId
            });
            if(existUserBinA){
                await Users.updateOne({
                    _id: myUserId
                },{ 
                    $pull: { requestFriends : userId}
                });
            }
            // lấy độ dài acceptFriends của B trả về cho B
            const infoUserB = await Users.findOne({
                _id: userId
            });
            const lengthAcceptFriends =  infoUserB.acceptFriends.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPTFRIEND",{
                userId:userId,
                lengthAcceptFriends:lengthAcceptFriends,
            });

            // lấy userId của A để trả về cho B
            socket.broadcast.emit("SERVER_RETURN_USERID_CANCEL_FRIEND",{
                userId:userId,
                userIdA:myUserId
            });
        });

        // người dùng TỪ CHÓI yêu cầu kết bạn   
        socket.on("CLIENT_REMOVE_FRIEND", async (userId)=>{
            const myUserId = res.locals.user.id;

            // console.log(myUserId);  // ID của B
            // console.log(userId);    // ID của A

            // Xóa id của A trong acceptFriends của B
            const existUserAinB = await Users.findOne({
                _id:myUserId,
                acceptFriends: userId
            });
            if(existUserAinB){
                await Users.updateOne({
                    _id: myUserId
                },{
                    $pull: { acceptFriends : userId}          
                });
            }
            // Xóa id của B trong requestFriends của A
            const existUserBinA = await Users.findOne({
                _id:userId,
                requestFriends: myUserId
            });
            if(existUserBinA){
                await Users.updateOne({
                    _id: userId
                },{
                    $pull: { requestFriends : myUserId}
                });
            }

        });

        // người dùng CHẤP NHẬN yêu cầu kết bạn   
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId)=>{
            const myUserId = res.locals.user.id;

            // console.log(myUserId);  // ID của B
            // console.log(userId);    // ID của A

            const existUserAinB = await Users.findOne({
                _id:myUserId,
                acceptFriends: userId
            });
            const existUserBinA = await Users.findOne({
                _id:userId,
                requestFriends: myUserId
            });
        
            // tạo phòng chat chung
            let roomchat ;
            if(existUserAinB && existUserBinA){
                roomchat = new RoomChat({
                    typeRoom:"friend",
                    users: [
                        {
                            user_id:userId,
                            role: "supperAdmin"
                        },
                        {
                            user_id:myUserId,
                            role: "supperAdmin"
                        }
                    ]
                });
                await roomchat.save();
            }

            // Thêm {user_id, roomchatid} của A vào FriendsList của B
            // Xóa id của A trong acceptFriends của B
            
            if(existUserAinB){
                await Users.updateOne({
                    _id: myUserId
                },{
                    $push: {
                        FriendsList: {
                            user_id: userId,
                            room_chat_id: roomchat.id,
                        }
                    },
                    $pull: { acceptFriends : userId}          
                });
            }


            // Thêm {user_id, roomchatid} của B vào FriendsList của A
            // Xóa id của B trong requestFriends của A
            
            if(existUserBinA){
                await Users.updateOne({
                    _id: userId
                },{
                    $push: {
                        FriendsList: {
                            user_id: myUserId,
                            room_chat_id: roomchat.id,
                        }
                    },
                    $pull: { requestFriends : myUserId}
                });
            }

        });
    });
}