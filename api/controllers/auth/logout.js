const Users = require('../../models/user.model');
const jwt = require('jsonwebtoken');


module.exports.logout = async (req, res) => {
    try {
        // get token from user
        const { authorization } = req.headers;
        
        //check token
        if(!authorization){
            return res.status(401).json({message: "Token not found!"})
        }

        const token = authorization.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
          return res.status(401).json({message: "Invalid token!"})
        }

        const removeToken = await Users.findOneAndUpdate({ email:decode.user.email }, { $pull: { tokens: token } });

        //send success response
        res.status(200).json({message: "Logout success"});
    } catch (error) {

        res.status(500).json({message: "Something wrong",error});
    }
}