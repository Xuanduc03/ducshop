
import AddProduct from "~/components/Admin/Product/AddProduct";
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
    {path: '/collection/:categoryId', component: Collections}
];

const privateRoute = [
    {path: "/admin/dashboard", component: Dashboard},
    {path: "/admin/users", component: UserManager},
    {path: "/admin/categories", component: CategoryManager},
    {path: "/admin/product/addproduct", component: AddProduct},
    {path: "/admin/products", component: ProductManager}
];

export {publicRoute, privateRoute};