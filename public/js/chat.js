// CLIENT SEND MESS
const formSendData = document.querySelector(".chat .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value;

        if(content){
            socket.emit("CLIENT_SEND_MESS",content);
            e.target.elements.content.value = "";
        }
    })
}
// end  CLIENT SEND MESS