// chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.add("add"); // thêm class 'add' vào box-user khi gửi kết bạn
      const userId = btn.getAttribute("btn-add-friend");
      // console.log(userId);

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// end chức năng gửi yêu cầu

// chức năng HỦY gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.remove("add");
      const userId = btn.getAttribute("btn-cancel-friend");
      // console.log(userId);

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// end chức năng HỦY gửi yêu cầu

// chức năng từ chối kết bạn
const listBtnTuChoiFriend = document.querySelectorAll("[btn-remove-friend]");
if (listBtnTuChoiFriend.length > 0) {
  listBtnTuChoiFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.add("remove");

      const userId = btn.getAttribute("btn-remove-friend");
      // console.log(userId);

      socket.emit("CLIENT_REMOVE_FRIEND", userId);
    });
  });
}
// end chức năng từ chối kết bạn

// chức năng chấp nhận kết bạn
const listBtnChapNhanFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnChapNhanFriend.length > 0) {
  listBtnChapNhanFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.add("accepted");

      const userId = btn.getAttribute("btn-accept-friend");
      // console.log(userId);

      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
// end chức năng chấp nhận kết bạn

// SERVER_RETURN_LENGTH_ACCEPTFRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPTFRIEND", (data) => {
  const badge_user_accept = document.querySelector("[badge-user-accept]");
  const userId = badge_user_accept.getAttribute("badge-user-accept");

  if (userId == data.userId) {
    badge_user_accept.innerHTML = data.lengthAcceptFriends;
  }
});
// end SERVER_RETURN_LENGTH_ACCEPTFRIEND

// SERVER_RETURN_INFO_ACCEPTFRIEND
socket.on("SERVER_RETURN_INFO_ACCEPTFRIEND", (data) => {
  //trang lời mời kết bạn
  const data_user_accept = document.querySelector("[data-user-accept]");
  if(data_user_accept){
    const userId = data_user_accept.getAttribute("data-user-accept");

    if (userId == data.userId) {
      // vẽ user ra giao diện
      const newBoxUser = document.createElement("div");
      newBoxUser.classList.add("col-6");
      newBoxUser.setAttribute("user-id",data.infoUserA._id);

      newBoxUser.innerHTML = `
        <div class="box-user">
          <div class="inner-avatar">
            <img src="/img/avatar.jpg" alt="${data.infoUserA.fullName}">
          </div>
          <div class="inner-info"> 
            <div class="inner-name">${data.infoUserA.fullName}</div>
            <div class="inner-buttons"> 
              <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-remove-friend="${data.infoUserA._id}">Xóa</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="btn-deleted-friend" disabled="disabled">Đã xóa</button>
              <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="btn-accepted-friend" disabled="disabled">Đã chấp nhận</button>
            </div>
          </div>
        </div>
    `;
    data_user_accept.appendChild(newBoxUser);

      // xóa lời mời kết bạn
      const btnremovefriend = newBoxUser.querySelector("[btn-remove-friend]");
      btnremovefriend.addEventListener("click", () => {
        btnremovefriend.closest(".box-user").classList.add("remove");
        const userId = btnremovefriend.getAttribute("btn-remove-friend");
        socket.emit("CLIENT_REMOVE_FRIEND", userId);
      });
      // end xóa lời mời kết bạn

      // chấp nhận lời mời kết bạn
      const btnacceptfriend = newBoxUser.querySelector("[btn-accept-friend]");
      btnacceptfriend.addEventListener("click", () => {
        btnacceptfriend.closest(".box-user").classList.add("accepted");
        const userId = btnacceptfriend.getAttribute("btn-accept-friend");
        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
      });
    // end chấp nhận lời mời kết bạn


  }
  }
  // end trang lời mời kết bạn

  // trang danh sách người dùng
  const data_user_not_friend = document.querySelector("[data-user-not-friend]");
  if(data_user_not_friend){
    const userId = data_user_not_friend.getAttribute("data_user_not_friend");
    if(userId == data.userId){
      // xóa A khỏi danh sách của B
      const boxUserRemove = data_user_not_friend.querySelector(`[user-id="${data.infoUserA._id}"]`);
      if(boxUserRemove){
        data_user_not_friend.removeChild(boxUserRemove);
      }
    }
  }
  //end trang danh sách người dùng
});
// end SERVER_RETURN_INFO_ACCEPTFRIEND


//SERVER_RETURN_USERID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USERID_CANCEL_FRIEND", (data) => {
  const data_user_accept = document.querySelector("[data-user-accept]");
  const userId = data_user_accept.getAttribute("data-user-accept");

  if (userId == data.userId) {
    // xóa A khỏi danh sách của B
    const boxUserRemove = data_user_accept.querySelector(`[user-id="${data.userIdA}"]`);
    if(boxUserRemove){
      data_user_accept.removeChild(boxUserRemove);
    }
  }
});
// end SERVER_RETURN_USERID_CANCEL_FRIEND

// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
  const data_user_friend = document.querySelector("[data-user-friend]");
  if(data_user_friend){
    const boxUser = data_user_friend.querySelector(`[user-id="${userId}"]`);
    if(boxUser){
      boxUser.querySelector("[status]").setAttribute("status","online")
    }
  }
});
// end SERVER_RETURN_USER_ONLINE

//SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId) => {
  const data_user_friend = document.querySelector("[data-user-friend]");
  if(data_user_friend){
    const boxUser = data_user_friend.querySelector(`[user-id="${userId}"]`);
    if(boxUser){
      boxUser.querySelector("[status]").setAttribute("status","offline")
    }
  }
});
// end SERVER_RETURN_USER_OFFLINE