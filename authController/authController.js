import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newdate = new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                console.error("Error hashing password:", err);
            } else {
                const alreadyUser = await userModel.findOne({ email });
                if (alreadyUser) {
                    return res.json({ message: "Email already exists please try different email" });
                }
                else {
                    const user = new userModel({
                        username: username,
                        password: hash,
                        email: email,
                        date: newdate
                    })
                    await user.save();

                    // Generating Token
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: 'None'
                    });
                    res.json({ success: true, message: "Form submitted successfully!" });
                }
            }
        });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ message: "Email does not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Wrong password" });
        }
        // Generate Token and Cookies:
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'None'
        });
        return res.json({ success: true, message: "Login successful" });
    }
    catch (err) {
        console.error("Error during login:", err);
        return res.json({ success: false, message: "Server error" });
    }
}

// Logout:
export const logout = async (req, res) => {
    // Clear the cookie by specifying its name
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    // Send a response indicating the user is logged out
    res.json({ success: true, message: 'Logged out successfully' });
}

// Is Authenticated:

export const isAuthenticated = async(req,res)=>{
    try {
        return res.json({success: true,})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}   
