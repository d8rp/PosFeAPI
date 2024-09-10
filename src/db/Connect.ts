import mongoose from "mongoose";

// Function to connect to MongoDB
const ConnectToDB = async (url: string) => {
    try {
        if(!url) {
            throw new Error("MongoDB URI environment variable is required");
        }
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default ConnectToDB;