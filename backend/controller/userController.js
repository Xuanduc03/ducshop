const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    try {
        const {phone, password} = req.body;

        if(!phone && !password) {
            res.json({
                message: "Please provide phone and password",
                error: true,
                success: false
            })
        };

        const userData = await User.findOne({phone});

        if(!userData){
            throw new Error("User has not account");
        }
        const checkPassword = await bcrypt.compare(password, userData.password);
        
        if(checkPassword){
            const tokenData = {
                _id : userData.id,
                username: userData.username
            };

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60 * 60 * 8});

            const tokenOption ={
                httpOnly :true,
                secure: true
            };

            res.cookie("token", token, tokenOption).json({
                message: "Login Successful",
                success: true,
                error: false,
                data: token
            });
        }else {
            throw new Error("Invalid password");
        }

    } catch (error) {
        res.status(401).json({
            message: "error now!",
            success: false,
            error: true
        })
    }
};

module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true });
        res.json({
            message: "Logout Successful",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            success: false,
            error: true
        });
    }
};

module.exports.GetInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "user details"
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error : true
        })
    }

}

// Lấy danh sách sản phẩm
module.exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};