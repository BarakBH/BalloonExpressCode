const Users = require('../../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authorize = async (req, res, next) => {
    try {
        // get token from user
        const { authorization } = req.headers;

        //check token
        if(!authorization){
            return res.status(401).json({message: "!לא מאושר"})
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "!לא מאושר"})
        }

        // verify token
        const checkToken = await Users.findOne({tokens: token});
        if(!checkToken){
            return res.status(401).json({message: "!לא מאושר"});
        }

        // check code expiry date
        if (new Date() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "!לא מאושר" });
        }

        req.user = checkToken;

        next();
    } catch (error) {

        res.status(500).json({message: "משהו השתבש",error});
    }
}

module.exports.authorizeAdmin = async (req, res, next) => {
    try {
        // get token from user
        const { authorization } = req.headers;

        //check token
        if(!authorization){
            return res.status(401).json({message: "TOKEN שגיאה במציאת"})
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Token לא ולידי"})
        }

        // verify token
        const checkToken = await Users.findOne({tokens: token});
        if(!checkToken){
            return res.status(401).json({message: "Token לא ולידי"});
        }

        // check code expiry date
        if (new Date() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "Code expired!" });
        }

        if(checkToken.role !== "admin"){
            return res.status(401).json({message: "אתה לא אדמין!"});
        }
        
        next();
    } catch (error) {

        res.status(500).json({message: "משהו השתבש",error});
    }
}