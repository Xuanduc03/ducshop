const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./config/db");
require("dotenv").config

const app = express();

app.use(cors({
    origin: process.env.FONTEND_DOMAIN_URL,
    credentials: true
}));

// use middleware 
app.use(express.json());

app.use(cookieParser());

// port server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server is running on port 8080");

})