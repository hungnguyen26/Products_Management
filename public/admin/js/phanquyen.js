// phân quyền
const tablePhanquyen = document.querySelector("[table-phanquyen]");
if(tablePhanquyen){
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click",()=>{
        let phanquyen = [];

        const rows = tablePhanquyen.querySelectorAll("[data-name]");
        rows.forEach((row)=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id"){
                inputs.forEach((input)=>{
                    const id = input.value;
                    phanquyen.push({
                        id: id,
                        phanquyen: []
                    });
                })
            }else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked;

                    // console.log(name);
                    // console.log(index);
                    // console.log(checked);
                    // console.log("-------");

                    if(checked){
                        phanquyen[index].phanquyen.push(name);
                    }
                })
            }
        });
        console.log(phanquyen);

        if(phanquyen.length > 0){
            const formChangePhanquyen = document.querySelector("#form-change-phanquyen");
            const inputPhanquyen = formChangePhanquyen.querySelector("input[name='phanquyen']")
            inputPhanquyen.value = JSON.stringify(phanquyen);
            formChangePhanquyen.submit();
        }
    });
}

// end phân quyền

// phân quyền data default
const dataRecord = document.querySelector("[data-records]");
// console.log(dataRecord);
if(dataRecord){
    const records = JSON.parse(dataRecord.getAttribute("data-records")); 
    const tablePhanquyen = document.querySelector("[table-phanquyen]");

    records.forEach((record,index)=>{
        const phanquyen = record.nhomQuyen;

        phanquyen.forEach((pq)=>{
            const row = tablePhanquyen.querySelector(`[data-name="${pq}"]`);
            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        })
        console.log("-------");
    })
}
// end phân quyền data default