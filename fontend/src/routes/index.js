import { Cart } from "~/pages/Cart";
import { Collections } from "~/pages/Collections";
import Home from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { Products } from "~/pages/Products";

const publicRoute = [
    {path: "/", component: Home},
    {path: '/product', component: Products},
    {path: '/login', component: LoginPage},
    {path: '/cart', component: Cart},
    {path: '/collection', component: Collections}
];

const privateRoute = [

];
export {publicRoute, privateRoute};