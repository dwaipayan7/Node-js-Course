const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// JWT authentication middleware
const jwtAuthMiddleware = (req, res, next) => {
    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token found" });
    }

    try {
        // Verify token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the decoded user info in req object
        next();
    } catch (error) {
        console.error("JWT Error: ", error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate a JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token valid for 1 hour
};

module.exports = { jwtAuthMiddleware, generateToken };
