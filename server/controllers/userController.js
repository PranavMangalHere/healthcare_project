const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();


const registerUser = asyncHandler(async(req, res) => {
        const { firstName, lastName, email, age, bloodGroup, gender, phoneNumber, password} = req.body;

        if(!firstName ||  !lastName|| !email || !age || !bloodGroup || !gender || !phoneNumber || !password ){
            res.send(400);
            throw new Error("Pleas enter all the details");
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.send(400).json({message :"User already exists"});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({firstName, lastName, email, age, bloodGroup, gender, phoneNumber, password: hashedPassword});
        res.status(201).json({message:"user registered successfully ", user: newUser});
});

module.exports = {registerUser};