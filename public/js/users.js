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