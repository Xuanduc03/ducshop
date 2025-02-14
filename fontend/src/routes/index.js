import { CartPage } from "~/pages/Cart";
import { Collections } from "~/pages/Collections";
import Home from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { Products } from "~/pages/Products";
import { SignUpPage } from "~/pages/Signup";

const publicRoute = [
    {path: "/", component: Home},
    {path: '/product', component: Products},
    {path: '/login', component: LoginPage},
    {path: '/signup', component: SignUpPage},
    {path: '/cart', component: CartPage},
    {path: '/collection', component: Collections}
];

const privateRoute = [

];
export {publicRoute, privateRoute};