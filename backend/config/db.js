const mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGOOSE_DB_URL);
        console.log("connect to db");
    } catch (error) {
        console.log("can't connect to db", error);
    }
}

module.exports = connectDB;