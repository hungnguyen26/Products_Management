// chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            btn.closest(".box-user").classList.add("add"); // thêm class 'add' vào box-user khi gửi kết bạn
            const userId = btn.getAttribute("btn-add-friend");
            // console.log(userId);

            socket.emit("CLIENT_ADD_FRIEND",userId);

        })
    })
}
// end chức năng gửi yêu cầu

// chức năng HỦY gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            btn.closest(".box-user").classList.remove("add"); 
            const userId = btn.getAttribute("btn-cancel-friend");
            // console.log(userId);

            socket.emit("CLIENT_CANCEL_FRIEND",userId);

        })
    })
}
// end chức năng HỦY gửi yêu cầu