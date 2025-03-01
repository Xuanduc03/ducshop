const express = require("express");
const { SignUp, Login, Logout, GetInfo, getAllUsers } = require("../controller/userController");
const authToken = require("../middleware/authToken");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesWithChildren,
    getSubcategories,
    getDetailCategory
} = require("../controller/categoryController");
const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct, 
    getProductsBySubCategory
} = require("../controller/productController");

const router = express.Router();

//api router user
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', authToken, Logout);
router.get('/user', authToken, GetInfo);
router.get('/allusers', getAllUsers);

//api router category
router.get("/categories", getCategoriesWithChildren);
router.get("/subcategories/:parentId", getSubcategories);
router.get('/category/:id', getDetailCategory);
router.post("/add-category", createCategory);
router.put('/edit-category/:id', updateCategory);
router.delete("/delete-category/:id", deleteCategory);

//api router product 
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.get('/products/category/:categoryId', getProductsByCategory);
router.get('/products/subcategory/:subcategoryId', getProductsBySubCategory)
router.post('/create-products', createProduct);
router.put("/edit-product/:productId", updateProduct);
router.delete("/delete-product/:productId", deleteProduct);

module.exports = router;
