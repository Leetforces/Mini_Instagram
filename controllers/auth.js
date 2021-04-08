import User from '../models/user';
import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

import crypto from 'crypto';

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_EMAIL_API_KEY,
    }
}))



export const register = async (req, res) => {
    const { name, email, password } = req.body.data;
    console.log("UESR DAta============>", req.body);
    if (!name) return res.status(400).send("Name is Required");
    if (!password || password.length < 6) return res.status(400).send("Password is required with length 6 or more.");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is Taken.");

    try {
        const user = new User(req.body.data);
        await user.save();

        //send email through sendgrid for success registeration.
        transporter.sendMail({
            to: user.email,
            from: process.env.MY_EMAIL,
            subject: "Signup Suceess on MiniInsta",
            html: "<h1>Welcome to MiniInsta :)</h1>"
        });


        return res.json({ OK: true })

    } catch (error) {
        console.log(error);
        return res.status(400).send("May be Invalid Details. Error. Try Again.");
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send("Invalid Email");
        user.comparePassword(password, (err, match) => {
            console.log("Match:", match, err);
            if ((!match) || err) {
                return res.status(400).send("Invalid Details.");
            }

            // GENERATE A TOKEN THEN SEND AS RESPOSNSE TO CLIENT
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            return res.json({
                token, user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    picUrl: user.picUrl,

                }
            });
            // console.log("LOGIN SUCCESSFUL:)");
            // return res.status(200).send("Login Successful:)");
        })


    } catch (error) {
        console.log(error);
        return res.status(400).send("Signin failed.");
    }
}

export const resetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const buffer = await crypto.randomBytes(32);
        const token = buffer.toString("hex");

        const user = await User.findOne({email}).exec();
        if(!user){
           return  res.status(400).send("USER NOT FOUND.")
        }

        console.log("UESR IN RESET PASSWORD:",user);
        
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;

        console.log("User Token assigned: ",user.resetToken);

        console.log("RESET TOKEN: ",token)
        console.log("Expiry Token TOKEN: ",user.expireToken)
        const result = await user.save();
        console.log("result after Update user=======>",result);
         const link= process.env.LINK_FOR_CHANGE_PASSWORD_PAGE;
        transporter.sendMail({
            to: user.email,
            from: process.env.MY_EMAIL,
            subject: "password reset",
            html: `
            <p>You reqested for password Reset.</p>
          <h3>Click in this <a href="${link}/${token}">Link</a> to reset the password.</h3>
          `
        });
        
        res.json({
            data: "Check Your Email to reset your Password",
        });

    } catch (err) {
        console.log("Error on sending reset Link====>", err);
        res.json({
            error: err,
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const newPassword= req.body.password;
        const sentToken=req.body.token;
        console.log("Token:",sentToken);
        console.log("password",newPassword);
        const user=await User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}});
        if(!user){
            return res.status(422).send("Session Expire or Invalid Token. Please Try to reset the Password Again.")
        }
        else{
            user.password=newPassword;
            user.resetToken=undefined;
            user.expireToken=undefined;
            await user.save();

            res.send("Password Updated Successfully 👍");
        }
    } catch (err) {
        console.log("Error On Updating the Password :", err);
        res.send({ error: err,});
    }
}