
import CategoryEdit from "~/components/Admin/Category/EditCategory";
import AddProduct from "~/components/Admin/Product/AddProduct";
import EditProduct from "~/components/Admin/Product/EditProduct";
import CheckOut from "~/components/CheckOut";
import ListSubCategories from "~/components/ListSubCategories/Index";
import CategoryManager from "~/pages/Admin/CategoryManager";
import Dashboard from "~/pages/Admin/Dashboard";
import ProductManager from "~/pages/Admin/ProductManager";
import UserManager from "~/pages/Admin/UserManager";
import { CartPage } from "~/pages/Cart";
import { Collections } from "~/pages/Collections";
import Home from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { Products } from "~/pages/Products";
import { SignUpPage } from "~/pages/Signup";

const publicRoute = [
    {path: "/", component: Home},
    {path: '/product/:id', component: Products},
    {path: '/login', component: LoginPage},
    {path: '/signup', component: SignUpPage},
    {path: '/cart', component: CartPage},
    {path: '/checkout', component: CheckOut},
    {path: '/collection/:categoryId', component: Collections},
    {path : '/collection/subcategories/:subcategoryId', component: ListSubCategories}
];

const privateRoute = [
    {path: "/admin/dashboard", component: Dashboard},
    {path: "/admin/users", component: UserManager},
    {path: "/admin/categories", component: CategoryManager},
    {path: "/admin/category/edit/:categoryId", component: CategoryEdit},
    // admin product route
    {path: "/admin/product/addproduct", component: AddProduct},
    {path: "/admin/product/editproduct/:productId", component: EditProduct},
    {path: "/admin/products", component: ProductManager}
];

export {publicRoute, privateRoute};