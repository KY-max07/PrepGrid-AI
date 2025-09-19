const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// require('dotenv').config(); => no need to config in all files (only need once usually server.js)

// generate JWT token 
const generateToken = (userId)  =>{
    return jwt.sign({id : userId} , process.env.JWT_SECRET, {expiresIn :"7d"});
};


/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */

const registerUser = async(req, res)=>{
    try{
        const {name, email, password, profileImageUrl} = req.body;
        const userExists = await User.findOne({email});

        //User existance checking
        if(userExists)  return res.status(400).json({message: "User Already exists"});

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            profileImageUrl,
        });


        //return response 

            res.status(201).json({
                _id: user.id,
                name : user.name,
                email : user.email,
                profileImageUrl : user.profileImageUrl,
                token : generateToken(user._id),  //token for authentiaction in future API requests (login, profile accessing...)
            });
    }catch(err){
        res.status(500).json({message : "server error", error : err.message});
    }
}
/**
 * @desc   login user
 * @route   POST /api/auth/login
 * @access  Public
 */

const loginUser = async(req, res)=>{
 try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(500).json({message : "Invalid email or password"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(500).json({message : "Invalid email or password"});
    res.status(200).json({
        _id: user.id,
        name : user.name,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        token : generateToken(user._id),  //token for authentiaction in future API requests (login, profile accessing...)
    });
 }catch(err){
    res.status(500).json({message : "server error", error : err.message});
 }
}
/**
 * @desc   Get User Profile
 * @route   GET /api/auth/profile
 * @access  Private
 */

const getUserProfile = async(req, res)=>{
    try{
        
        const user = await User.findById(req.user.id).select("-password");
        if(!user) return res.status(500).json({message : "User Not Found"});
        res.json(user);
     }catch(err){
        res.status(500).json({message : "server error", error : err.message});
     }
}


module.exports = {  registerUser, loginUser, getUserProfile};