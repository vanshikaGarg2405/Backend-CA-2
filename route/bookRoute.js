import express from "express";
import mongoose from "mongoose";
import Book from "../models/bookSchema.js";

const router = express.Router();

router.post("/api/books", async (req, res) => {
    try {
        const {title, author, category} = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }
        const book = new Book({
            title,
            author,
            category
        });
        const bookSaved = await book.save();
        res.status(201).json({
            message: "Successfully added!!",
            book: bookSaved
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.get("/api/books", async (req, res) => {
    try {
        const page= parseInt(req.query.page,10) || 1;
        const limit= parseInt(req.query.limit,10) || 10;
        const skip = (page - 1) * limit;
        const books = await Book.find().skip(skip).limit(limit);
        const totalRecords = await Book.countDocuments();
        res.status(201).json({
            currentPage: page,
            totalRecords: totalRecords,
            books: books
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.patch("/api/books/:id", async (req, res) => {
    try {
        const {availability} = req.body;
        if (typeof availability !== "boolean") {
            return res.status(400).json({
                message: "Availability must be true or false"
            });
        }
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid ID"
            });
        }
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { availability },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({
                message: "Not found!!"
            });
        }
        res.status(200).json({
            message: "Updated successfully",
            book: book
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

export default router;