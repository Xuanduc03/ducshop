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
    types : {
        type: String,
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

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;