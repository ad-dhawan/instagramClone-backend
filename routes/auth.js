const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {registerValidation, loginValidation} = require('../Validation');

//REGISTER
router.post("/register", async (req,res) => {
    try{
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).json({status: 400, message: error.details[0].message});

        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist){
            return res.status(409).json({status: 409, message: "User already exists"})
        }

        const usernameExist = await User.findOne({username: req.body.username});
        if(usernameExist){
            return res.status(408).json({status: 408, message: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create New User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //Save User
        const user = await newUser.save();
        res.status(200).json({status: 200, message: "User registered Successfully", id: newUser._id, username: newUser.username, email: newUser.email});
    }catch (err) {
        res.status(500).json({status: 500, message: err})
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).json({status: 400, message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json({status: 404, message: "User not found"});

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(401).json({status: 401, message: "wrong password"})

        res.status(200).json({status: 200, message: "Logged In", username: user.username, email: user.email, id: user._id, profilePicture: user.profilePicture, following: user.following, followers: user.followers})
    }catch (err){
        res.status(500).json({status: 500, message: err})
    }
});

module.exports = router; 