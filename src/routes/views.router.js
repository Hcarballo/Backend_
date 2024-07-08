import { Router } from "express";
import ProductsController from "../Controllers/products.controller.js";
import UsersController from "../Controllers/users.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { passportCall } from "../middlewares/passportCall.middlewares.js";

const router = Router();
const productManager = new ProductsController();
const usersManager = new UsersController();

router.get('/home', async (req, res) => {
    try {
        res.render('home', {});
    }
    catch (error) {
        console.log(error);
    }
});


router.get('/user', passportCall('jwt'), auth('admin'), async (req, res) => {
    const users = await usersManager.getUsers();
    res.render('user', { users });
})

router.get('/products', async (req, res) => {
    const product = await productManager.getProducts();

    res.render('products', { product });
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
        title: "Listado de productos WebSocket",
        products,
    })
})

router.get('/chat', (req, res) => {
    res.render('chat', {})
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

export default router;
