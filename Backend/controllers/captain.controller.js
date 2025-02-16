const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });
    if (isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: 'Captain Already Registered' });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password : hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({token , captain});
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(404).json({ message: 'Captain Not Found' });
    }
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid Password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token , captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain : req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message : 'Captain Logged Out Successfully'});
}