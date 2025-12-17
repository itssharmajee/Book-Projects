import mongoose from "mongoose";
import { Book } from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            success: true,
            message: books.length
                ? "All books fetched successfully"
                : "No books available in the collection",
            data: books
        });

    } catch (err) {
        console.error("Error fetching books:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
};

export const addNewBook = async (req, res) => {
    try {
        const { title, author, year, category } = req.body;

        // Basic validation
        if (!title || !author || !year || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields (title, author, year, category) are required",
                data: null
            });
        }

        const book = await Book.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });

    }

}
export const getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (book) {
            return res.status(200).json({
                success: true,
                message: "got particularly book successfully",
                data: book
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "book with current ID is not there in the collection",
                data: null
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }



}
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, title, year, category } = req.body;

        // Check if ID exists
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Book ID is required",
                data: null
            });
        }

        // Find book by ID
        const book = await Book.findById(id);

        // If book not found
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }
        // Update only provided fields
        if (author) book.author = author;
        if (title) book.title = title;
        if (year) book.year = year;
        if (category) book.category = category;

        // Save updated book
        const updatedBook = await book.save();
        //other way of updating book
        /*
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});
        */
        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });

        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found with current ID provide some different ID",
                data:null
            })
        }
        return res.status(200).json({
                success:true,
                message:"Book deleted successfully",
                data:book
            })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
}