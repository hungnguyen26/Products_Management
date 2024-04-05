const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    { 
        title: String,
        description: String,
        price: Number,
        discountPercentage:Number,
        stock:Number,
        thumbnail:String,
        status:String,
        position: Number,
        deleted: Boolean,
        deletedAt: Date
    }
);
const Products = mongoose.model('product', ProductSchema, "products");

module.exports = Products;