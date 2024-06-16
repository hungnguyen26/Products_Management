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
  const userId = badge_user_accept.getAttribute("[badge-user-accept]");

  if (userId == data.userId) {
    badge_user_accept.innerHTML = data.lengthAcceptFriends;
  }
});
// end SERVER_RETURN_LENGTH_ACCEPTFRIEND
