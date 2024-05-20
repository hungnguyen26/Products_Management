// cập nhật số lượng sản phẩm trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0){
    inputQuantity.forEach(input =>{
        input.addEventListener("change",(event)=>{
            const productID = input.getAttribute("product-id");
            const quantity = parseInt(input.value);

            if(quantity >= 1){
                window.location.href = `/cart/update/${productID}/${quantity}`;
            }
        })
    })
}
// end cập nhật số lượng sản phẩm trong giỏ hàng
