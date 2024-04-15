import { Router } from 'express';
import CartManager from '../managers/cartsManager.js';
const router = Router();


router.get('/', async (req, res) => {
    try {
        const classManager = new CartManager();
        await classManager.createCart()
        console.log('carro agregado');
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    };
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const classManager = new CartManager();
        classManager.list_products(cid);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const { pid, quantity } = req.body;

        const classManager = new CartManager();

        await classManager.add_productCart(cid, pid, quantity);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const classManager = new CartManager();
        await classManager.delete_cart(cid);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

export default router;