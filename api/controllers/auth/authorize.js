const Users = require('../../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authorize = async (req, res, next) => {
    try {
        // get token from user
        const { authorization } = req.headers;

        //check token
        if(!authorization){
            return res.status(401).json({message: "Unauthorized!"})
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthorized!"})
        }

        // verify token
        const checkToken = await Users.findOne({tokens: token});
        if(!checkToken){
            return res.status(401).json({message: "Unauthorized!"});
        }

        // check code expiry date
        if (new Date() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "Unauthorized!" });
        }

        req.user = checkToken;

        next();
    } catch (error) {

        res.status(500).json({message: "Something wrong",error});
    }
}

module.exports.authorizeAdmin = async (req, res, next) => {
    try {
        // get token from user
        const { authorization } = req.headers;

        //check token
        if(!authorization){
            return res.status(401).json({message: "Token not found!"})
        }

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Token invalid!"})
        }

        // verify token
        const checkToken = await Users.findOne({tokens: token});
        if(!checkToken){
            return res.status(401).json({message: "Invalid token!"});
        }

        // check code expiry date
        if (new Date() >= decoded.exp * 1000) {
            return res.status(400).json({ message: "Code expired!" });
        }

        if(checkToken.role !== "admin"){
            return res.status(401).json({message: "You are not admin!"});
        }
        
        next();
    } catch (error) {

        res.status(500).json({message: "Something wrong",error});
    }
}