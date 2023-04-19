const db = require("../../models/index");
const Users = db.users;
const Tokens = db.tokens;

module.exports.resetPassword = async (req, res) => {
    try {
        // get data from user
        const { code, password, email } = req.body;

        if(!code && !email) {
            return res.status(400).json({message: "אימייל או קוד שחזור חסרים"});
        }

        if(code){
            //verify Code
            const checkCode = await Tokens.findOne({ where: { token: code } });
            if (!checkCode) {
                return res.status(400).json({ message: "שחזור הקוד לא תקין או שזמנו עבר" });
            }

            //check if code type not same type 3 => password reset
            if (checkCode?.type !== 3) {
                return res.status(400).json({ message: "שחזור קוד לא תקין" });
            }

            // check code expiry date
            const date = await new Date();
            const expiryDate = await new Date(checkCode.expiry);
            if (expiryDate < date) {
                return res.status(400).json({ message: "הקוד פג תוקף" });
            }

            //delete code
            const deleteCode = await Tokens.destroy({
                where: { id: checkCode?.id },
            });

            //send success response
            res.status(200).json({ message: "סיסמא שוחזרה בהצלחה" });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "משהו השתבש", error });
    }
};