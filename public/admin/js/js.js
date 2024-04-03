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

//phân trang pegination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
            
    buttonPagination.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page",page);

            window.location.href = url.href;

        })
    })
}
//end phân trang

// check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi ]");
if(checkBoxMulti){
    const inputCheckAll = checkBoxMulti.querySelector('input[name = "checkall"]');
    const inputCheckId = checkBoxMulti.querySelectorAll('input[name = "id"]');

    // logic check All
    inputCheckAll.addEventListener("click",()=>{ 
        // console.log(inputCheckAll.checked);    // checked : đã được check hay chưa
        if(inputCheckAll.checked){
            inputCheckId.forEach((input)=>{
                input.checked = true;
            })
        }else{
            inputCheckId.forEach((input)=>{
                input.checked = false;
            })
        }
    })

    inputCheckId.forEach((input)=>{
        input.addEventListener("click",()=>{
            const countChecked = checkBoxMulti.querySelectorAll('input[name = "id"]:checked')

            if(countChecked.length == inputCheckId.length ){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}
// END check box multi

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(event)=>{
        event.preventDefault();      // k load lại trang, ngăn hành động mặc định
        console.log(event);

        const checkBoxMulti = document.querySelector("[checkbox-multi ]");
        const inputCheck = checkBoxMulti.querySelectorAll('input[name = "id"]:checked');

        if(inputCheck.length > 0){
            let Ids = [];   

            const inputIDS = formChangeMulti.querySelector('input[name = "ids"]');

            inputCheck.forEach((input)=>{
                const id = input.value;
                Ids.push(id);
            })

            // console.log(Ids.join(", "));

            inputIDS.value = Ids.join(", ");

            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất 1 bản ghi!!")
        }
    })
}
//END form change multi