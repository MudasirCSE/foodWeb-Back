import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
}, { collection: "categories" });

const foodCategory = mongoose.model('category', foodCategorySchema);
export default foodCategory;