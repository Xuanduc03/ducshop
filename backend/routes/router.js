const express = require("express");
const { SignUp } = require("../controller/userController");

const router = express.Router();

//api router user
router.post("/signup", SignUp);


module.exports = router;
