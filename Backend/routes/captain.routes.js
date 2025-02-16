const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const  authMiddleware  = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password Must Be At Least 6 Characters Long'),
    body('fullname.firstname').isLength({min : 2}).withMessage('First Name Must Be At Least 2 Characters Long'),
    body('vehicle.color').isLength({min : 3}).withMessage('Color Must Be At Least 3 Characters Long'),
    body('vehicle.plate').isLength({min : 3}).withMessage('Plate Must Be At Least 3 Characters Long'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity Must Be At Least 1'),
    body('vehicle.vehicleType').isIn(['car' , 'motorcycle' , 'auto']).withMessage('Invalid Vehicle Type'),
    ], captainController.registerCaptain
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password Must Be At Least 6 Characters Long')
    ], captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;