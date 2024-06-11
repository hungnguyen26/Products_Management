import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT SEND MESS
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESS", content);
      e.target.elements.content.value = "";
    }
  });
}
// end  CLIENT SEND MESS

// SERVER RETURN MESS
socket.on("SERVER_RETURN_MESS", (data) => {
  const myID = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");

  const div = document.createElement("div");
  let htmlFullName = "";
  if (myID == data.userId) {
    div.classList.add("inner-outcoming");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }
  div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;

  body.appendChild(div);

  body.scrollTop = body.scrollHeight; // hiển thị tin nhắn mới nhất
});
// end SERVER RETURN MESS

/* luôn cuộn xuống tin nhắn mới nhất */
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
/* end luôn cuộn xuống tin nhắn mới nhất */

// emoji-picker
// hiển thị nút icon
const buttonIcon = document.querySelector(".btn-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}


// chèn icon vào input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );

  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    console.log(icon);
    inputChat.value = inputChat.value + icon;
  });
}
// end emoji-picker
