import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is mandatory"],
        trim :true,
        maxLength:[100, "book title can't be more than 100 charaters"]
    },
    author:{
        type:String,
        required:[true,"author name is mandatory"],
        trim :true,
    },
    year:{
        type:Number,
        required:[true,"publication year is required"],
        min:[1000, "Year must be atleast 1000"],
        max:[new Date().getFullYear(),"Year cannot be in the future"]
    },
    category:{
        type:String,
        required:[true,"category is required"],
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // }
},{timestamps:true});

export const Book = mongoose.model('book',bookSchema);