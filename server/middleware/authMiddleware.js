const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    try {
        console.log(req.cookies)
        const accessToken = req.cookies.access; // Retrieve the access token from cookies
        if (accessToken) {
            return res.status(403).json({ message: "Access token not found" });
        }
        // const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        // // Attach the user information to the request object for further use
        // req.user = payload;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = ensureAuthenticated;