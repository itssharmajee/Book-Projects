import mongoose from "mongoose";
import { Book } from "../models/book.model.js";
import {data} from "./seedData.js"
async function seedData(){
    try {
        await mongoose.connect("mongodb://localhost:27017/bookstore");
        await Book.insertMany(data);
        console.log("data seeded successfully");
    } catch (err) {
        console.error(err);
        
    }
}

seedData()