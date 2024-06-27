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
        if (req.session.user) {
            const { first_name } = await req.session.user;
            res.render('home', { first_name });
        } else {
            res.render('home', {});
        }
    } catch (error) {
        console.log(error);
    } 
    // res.render('home', {})
})

router.get('/user', passportCall('jwt'), auth('admin'), async (req, res) => {
    const users = await usersManager.getUsers();
    res.render('user', { users });
})

router.get('/products', async (req, res) => {
    const { numpage, limit } = req.query;
    const { docs, page, hasNextPage, hasPrevPage, nextPage, prevPage } = await productManager.getProducts({ limit, numpage });

    res.render('products', {
        products: docs,
        page,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage
    });
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
    console.log("aca")
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

export default router;
