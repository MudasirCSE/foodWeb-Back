import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    imgURL: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }, // Reference to the category model
}, { collection: "foodItems" });

// Create a compound index for imgURL and description to enforce uniqueness
foodItemSchema.index({ imgURL: 1, itemName: 1 }, { unique: true });

const foodItem = mongoose.model("foodItem", foodItemSchema);
export default foodItem;