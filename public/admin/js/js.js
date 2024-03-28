// button status
const buttonStatus = document.querySelectorAll("[button-status]")   //thuộc tính tự định nghĩa nên phải có []
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach((button) =>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");

            if(status){
                url.searchParams.set("status",status);
            }else{
                url.searchParams.delete("status");
            }
            
            window.location.href = url.href;
        })
    })
}
// end button status