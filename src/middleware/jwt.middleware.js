const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa', data: null });
    }

    const token = authHeader && authHeader.split(' ')[1];
    if (!authHeader) {
        return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa', data: null });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ status: 108, message: 'Token tidak tidak valid atau kadaluwarsa', data: null });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;