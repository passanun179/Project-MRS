const jwt = require("jsonwebtoken");
const response = require('../models/response.models');

module.exports = (req, res, next) => {
    try {


        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) return response.error(res, 'Access denied. No token provided.', 'Failed', 403);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        return response.error(res, 'Invalid token.', 'Failed', 400);
    }
};