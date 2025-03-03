const jwt = require("jsonwebtoken");

const authenticateUser = (req) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new Error("Authorization token is required")
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        throw new Error("Invalid token format")
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded
    } catch (error) {
        throw new Error("Invalid or expired token")
    }
};

module.exports = { authenticateUser }
