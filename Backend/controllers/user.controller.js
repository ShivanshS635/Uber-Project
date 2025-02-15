const userSchema = require('../models/user.model');
const userServices = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname , email , password} = req.body;
    const hashPassword = await userSchema.hashPassword(password);
    const user = await userServices.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hashPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token,user });
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;
    const user = await userSchema.findOne({ email   }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid Email or Password' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();

    res.status(200).json({ token,user });
}