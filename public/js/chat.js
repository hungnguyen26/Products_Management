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
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
// end  CLIENT SEND MESS

// SERVER RETURN MESS
socket.on("SERVER_RETURN_MESS", (data) => {
  const myID = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const BoxTyping = document.querySelector(".inner-list-typing");


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

  body.insertBefore(div,BoxTyping);

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
var timeOut;

const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );

  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;

    inputChat.setSelectionRange(inputChat.value.length,inputChat.value.length );
    inputChat.focus();

    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(()=>{
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    },3000)

  });


  inputChat.addEventListener("keyup", () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(()=>{
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    },3000)
  });
}
// end emoji-picker

//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if(data.type == "show"){
      const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    
      if(!existTyping){
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id",data.userId);
    
        boxTyping.innerHTML = `
          <div class="box-typing">
            <div class="inner-name">${data.fullName} </div>
            <div class="inner-dots">
              <span> </span>
              <span> </span>
              <span> </span>
            </div>
          </div>
        `;
    
        elementListTyping.appendChild(boxTyping);
      }
    }else{
      const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
      if(boxTypingRemove){
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
    
  });
}

// end SERVER_RETURN_TYPING
