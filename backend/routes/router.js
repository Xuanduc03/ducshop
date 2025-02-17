const express = require("express");
const { SignUp, Login, Logout, GetInfo } = require("../controller/userController");
const authToken = require("../middleware/authToken");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithChildren,
    getSubcategories
} = require("../controller/categoryController");
const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct 
} = require("../controller/productController");

const router = express.Router();

//api router user
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/logout', authToken, Logout);
router.get('/user', authToken, GetInfo);

//api router category
router.get("/categories", getCategoriesWithChildren);
router.get("/subcategories/:parentId", getSubcategories);
router.post("/add-category", createCategory);
router.put('/edit-category/:id', updateCategory);
router.delete("/delete-category/:id", deleteCategory);

//api router product 
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.get('/products/category/:categoryId', getProductsByCategory);
router.post('/create-products', createProduct);
router.put("/edit-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
