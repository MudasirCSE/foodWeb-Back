import userModel from "../models/user.js";

export const getUserData = async (req, res) => { 
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // console.log(user);
        res.json({
            success: true,
            userData: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}