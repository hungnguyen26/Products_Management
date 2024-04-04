// change status
const btnChangeSatus = document.querySelectorAll("[button-changeStatus]");
if(btnChangeSatus.length > 0){

    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    btnChangeSatus.forEach((button)=>{
        button.addEventListener("click",()=>{

            const statusCurrent = button.getAttribute("data-status");
            const idCurrent = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive":"active";

            // console.log(statusCurrent);
            // console.log(idCurrent);
            // console.log(statusChange);

            const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// end change status

// delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    

    buttonsDelete.forEach((button)=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");

            if(isConfirm == true){
                const id = button.getAttribute("data-id");
     
                const action = path + `/${id}?_method=DELETE`;
                // console.log(action);

                formDeleteItem.action = action;
                formDeleteItem.submit();
            }

        });
    });
}
// end delete item