import { Router } from "express";
import ProductsManager from "../dao/managers/productsManager.js";
import { uploads } from "../utils/multer.js";

const router = Router();
const productManager = new ProductsManager();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {
        products,
    });
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
        title: "Listado de productos WebSocket",
        products,
    })
})

router.get('/chat', (req,res) =>{
    res.render('chat',{})
})

export default router
