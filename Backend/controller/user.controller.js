const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password} = req.body;
    const isUserAlready = await userModel.findOne({email});
    if (isUserAlready) {
        return res.status(400).json({message:'User already exists with this email'});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    });

    const token = user.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Adjust as needed
    });

    res.status(201).json({ token,user });

} 

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token,user });
}

module.exports.getUserProfile = async (req,res,next) => {
    res.status(200).json({
        user: req.user
    });
}
module.exports.logoutUser = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Add token to blacklist so it can't be reused
        await blacklistTokenModel.create({ token });

        // Clear cookie if it exists
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

