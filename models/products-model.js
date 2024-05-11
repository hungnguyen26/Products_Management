const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema(
    { 
        title: String,
        product_category_id:{
            type: String,
            default:""
        },
        description: String,
        price: Number,
        discountPercentage:Number,
        stock:Number,
        thumbnail:String,
        status:String,
        position: Number,
        slug: {
            type: String, 
            slug: "title",
            unique: true
        },
        createBy:{
            accountID: String,
            createdAt: {
                type: Date,
                default: Date.now  // lấy ra thời gian hiện tại
            }
        },
        deleted:{
            type: Boolean,
            default: false
        } ,


        deletedBy:{
            accountID: String,
            deletedAt: Date
        },
        
    },
    {
        timestamps: true    
    }
);
const Products = mongoose.model('product', ProductSchema, "products");

module.exports = Products;