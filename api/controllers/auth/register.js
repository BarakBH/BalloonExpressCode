const Users = require('../../models/user.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// validation user data
module.exports.registerValidation = [
    body("name").isLength({min: 3}).withMessage("Name is too short minimum 3 letters! "),
    body("name").isLength({max: 50}).withMessage("Name is too long maximum 50 letters! "),
    body("email").isLength({min: 3}).withMessage("Email is too short minimum 3 letters! "),
    body("email").isLength({max: 50}).withMessage("Email is too long maximum 50 letters! "),
    body("password").isLength({min: 6}).withMessage("Password is too short minimum 6 letters! "),
    body("password").isLength({max: 50}).withMessage("Password is too long maximum 50 letters! "),
];

module.exports.register = async (req, res) => {
    try {
        // get data from user
        const {name, email, password} = req.body;
        console.log(req.body);

        //check data validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(403).json({message: "Please send correct data",errors:errors})
        }

        // if user exist
        const checkUser = await Users.findOne({email})
        if(checkUser){
            return res.status(400).json({message: "User with this email already exist"});
        }

        //create authentication token
        const token = jwt.sign({user:{email,name} }, process.env.JWT_SECRET, { expiresIn: '7d' } );

        //add user to database
        const createUser = await Users.create({name,email,password,tokens:token})

        //send success response
        res.status(200).json({message: "Registration successfully completed", token, user: {name,email}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something wrong",error});
    }
}