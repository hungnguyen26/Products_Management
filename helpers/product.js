module.exports.priceNewProducts = (products)=>{
    const newProducts = products.map((item)=>{
        item.priceNew = (item.price *(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    return newProducts;
}