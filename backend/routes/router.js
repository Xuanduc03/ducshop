const express = require("express");
const { SignUp, Login, Logout, GetInfo } = require("../controller/userController");
const authToken = require("../middleware/authToken");

const router = express.Router();

//api router user
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/logout', authToken, Logout);
router.get('/user', authToken, GetInfo);

module.exports = router;
