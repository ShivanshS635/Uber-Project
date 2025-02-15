const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied. Unauthorized user.');
    }
    const isBlacklisted = await userModel.findOne({
        token
    });
    if (isBlacklisted) {
        return res.status(401).send('Access denied. Unauthorized user.');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).send('Invalid token.');
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send('Access denied. Unauthorized user.');
    }
}