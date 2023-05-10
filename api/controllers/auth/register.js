const Users = require('../../models/user.model');
// const Admins = require('../../models/admin.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// validation user data
module.exports.registerValidation = [
    body("name").isLength({min: 3}).withMessage("שם קצר מדי, מינימום 3 תווים "),
    body("name").isLength({max: 50}).withMessage("שם ארוך מדי, מקסימום 50 תווים "),
    body("email").isLength({min: 3}).withMessage("אימייל קצר מדי, מינימום 3 תווים "),
    body("email").isLength({max: 50}).withMessage("אימייל ארוך מדי, מקסימום 50 תווים "),
    body("password").isLength({min: 6}).withMessage("סיסמא קצר מדי, מינימום 6 תווים "),
    body("password").isLength({max: 50}).withMessage("סיסמא ארוכה מדי, מקסימום 50 אותיות "),
];

module.exports.register = async (req, res) => {
    try {
        // get data from user
        const {name, email, password} = req.body;
        console.log(req.body);

        //check data validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(403).json({message: "אנא הכנס את המידע הנדרש",errors:errors})
        }

        // if user exist
        const checkUser = await Users.findOne({email})
        if(checkUser){
            return res.status(400).json({message: "אימייל כזה כבר רשום אצלנו במערכת"});
        }

        //create authentication token
        const token = jwt.sign({user:{email,name} }, process.env.JWT_SECRET, { expiresIn: '7d' } );

        //add user to database
        const createUser = await Users.create({name,email,password,tokens:token})

        //send success response
        res.status(200).json({message: "הרשמה הושלמה בהצלחה !", token, user: {name,email}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "משהו השתבש",error});
    }
}

module.exports.adminRegister = async (req, res) => {
    try {
        // get data from user
        const {name, email, password} = req.body;
        // console.log(req.body);

        //check data validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(403).json({message: "אנא הכנס את המידע הנדרש",errors:errors})
        }

        // if user exist
        const checkUser = await Users.findOne({email})
        if(checkUser){
            return res.status(400).json({message: "אדמין כבר קיים"});
        }

        //create authentication token
        const token = jwt.sign({user:{email,name} }, process.env.JWT_SECRET, { expiresIn: '7d' } );

        //add user to database
        const createAdmin = await Users.create({name,email,password,tokens:token, role:'admin'});

        //send success response
        res.status(200).json({message: "הרשמה הושלמה בהצלחה !", token, user: {name,email}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "משהו השתבש",error});
    }
}