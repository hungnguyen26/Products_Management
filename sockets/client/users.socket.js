const Users = require("../../models/users.model");

module.exports = async (res)=>{
    _io.once('connection', (socket) => {

        // người dùng hủy gửi yêu cầu kết bạn
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

        });
    });
}