
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const verifyUser = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verifyUser); //{ _id: '603e12e7e3232f36a84657a2', iat: 1614687056, exp: 1614690656 }

        const user = await User.findOne({ _id: verifyUser._id });
        if (!user) {
            return res.status(404).json({
                message: "User must be logged in.",
            })
        }
        req._id = user._id;
        next();
    } catch (error) {
        return res.status(401).json({
            error: error,
        });
    }

}