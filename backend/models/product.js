const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    features: {
        type: String
    },
    seoDescription: {
        type: String
    },
    brandNew: {
        type: Boolean
    },
    price: {
        current: {
            type: Number,
            required: true,
        },
        original: {
            type: Number
        },
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
    },
    discounts: {
        type: String,
        default: "0%",
    },
    types: [
        {
            name: {
                type: String,
            },
        }
    ],
    images: [
        {
            src: {
                type: String,
                required: true,
            },
            thumbnail: {
                type: String,
            },
        },
    ],
    colors: [
        {
            name: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            },
        },
    ],
    sizes: [
        {
            size: {
                type: String,
                required: true,
            },
            heightRange: {
                type: String,
                required: true,
            },
            weightRange: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
