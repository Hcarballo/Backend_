
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

router.get('/realtimeproducts', (req,res)=>{
res.render('realTimeProducts',{})
})

export default router
