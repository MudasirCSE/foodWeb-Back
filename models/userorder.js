import mongoose from "mongoose";

var orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    fname: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    order: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: {type: String, require: true}
    }],
    totalPrice: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "Processing"
    },
    date: {
        type: String,
    }

}, { collection: "userorders" });

const order = mongoose.model('userorders', orderSchema);
export default order