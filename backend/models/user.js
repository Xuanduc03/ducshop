const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname : {
        type: String, 
        trim: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: 3,
        max: 50
    },
    phone: {
        type: Number,
        min: 0,
        max: 10
    },
    address : {
        type: String,
    },
    role :{
        type: String,
        enum: ['user', 'admin'],
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;