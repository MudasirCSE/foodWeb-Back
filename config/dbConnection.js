import mongoose from "mongoose";

export const dbConnection = async() =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/Food_Do`);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
