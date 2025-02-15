const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/router");

const app = express();
require("dotenv").config();

app.use(cors({
    origin: process.env.FONTEND_DOMAIN_URL || "http://localhost:3000",
    credentials: true
}));

// use middleware 
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);


// port server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database", err);
});

