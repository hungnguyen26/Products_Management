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
  }else{
    div.classList.add("inner-incoming");
    htmlFullName=`<div class="inner-name">${data.fullName}</div>`
  }
  div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;

  body.appendChild(div);
});
// end SERVER RETURN MESS
