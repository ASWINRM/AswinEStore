import mongoose from "mongoose";

const wishlistSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:String,
        required:true
    }
})

const Wishlist=mongoose.model('WishList',wishlistSchema)

export default Wishlist;
