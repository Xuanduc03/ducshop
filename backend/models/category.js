const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: ''
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.Model("Category", CategorySchema);

module.exports = Category;