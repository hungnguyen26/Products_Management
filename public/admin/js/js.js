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

// form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit",(event)=>{
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
//end  form search