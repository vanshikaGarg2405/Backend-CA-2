import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;