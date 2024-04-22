
import { Router } from "express";
import ProductsManager from '../managers/productsManager.js';


const router = Router();

const classproducts = new ProductsManager();

router.get('/', async (req, res) => {
    const products = await classproducts.getProducts();
    res.render('home', {
        products,
    });
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await classproducts.getProducts();
    res.render('realTimeProducts', {
        title: "Listado de productos WebSocket",
        products,
    })
})

export default router
