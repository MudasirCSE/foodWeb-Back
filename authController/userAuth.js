import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
    // console.log(req.cookies);  // Log cookies to see if the token exists
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(tokenDecode)
        const { userId, exp } = tokenDecode;
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp < currentTime) {
            return res.status(401).json({ success: false, message: "Token has expired. Please login again." });
        }
        if (userId) {
            req.body.userId = userId
            next();
        } else {
            return res.status(401).json({ success: false, message: "Invalid Token. Not Authorized." });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}