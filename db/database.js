import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("Database Connected!!");
    } catch (error) {
        console.log("Database couldn't connect!!", error);
        process.exit(1);
    }
};

export default connectDB;