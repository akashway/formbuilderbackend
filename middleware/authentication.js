const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Not authorised to add folder/file" });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
        }
    }
};
module.exports = authentication;