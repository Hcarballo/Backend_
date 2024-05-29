import { Router } from "express";
import ProductsManager from "../dao/managers/productsManager.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { uploads } from "../utils/multer.js";

const router = Router();
const productManager = new ProductsManager();

router.get('/home', async (req, res) => {
    if (req.session.user) {
        const { first_name} = await req.session.user;
        res.render('home', {first_name});
    }else{
        res.render('home', {});
    }
   
})

router.get('/products', auth, async (req, res) => {
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
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

export default router;
