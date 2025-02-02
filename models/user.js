import mongoose from "mongoose"

const user = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    date: String,
}, { collection: 'users' });

const userModel = mongoose.model('user', user)
export default userModel