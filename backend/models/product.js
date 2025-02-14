const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name : {
        type: String
    }
});

module.exports = mongoose.model("Product", ProductSchema);