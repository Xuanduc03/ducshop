const User = require('../models/user');
const bcrypt = require("bcrypt");

module.exports.SignUp = async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            throw new Error("User already exists");
        }

        // Kiểm tra nếu thiếu email, password hoặc name
        if (!email && !phone) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!fullname) {
            throw new Error("Please provide name");
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) {
            throw new Error("Something went wrong with password hashing");
        }

        //create new user
        const payload = {
            ...req.body,
            password: hashPassword
        }
        console.log(payload)
        const newUser = new User(payload);
        const saveUser = await newUser.save();

        res.status(200).json({
            data: saveUser,
            message: "Đăng ký thành công",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(401).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
};

module.exports.Login = async (req, res) => {

};