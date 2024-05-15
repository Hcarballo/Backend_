import { Router } from 'express';
import CartManager from '../dao/managers/cartsManager.js';

const router = Router();
const cartManager = new CartManager()

router.get('/', (req, res) => {
    try {
        const result = cartManager.createCart();
        console.log('carro agregado');
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    };
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cartDB = await cartManager.findbyid(cid);
        if (!cartDB) {
            return res.send('Carro Inexistente');
        }
        else {
            return res.send(cartDB);
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const { pid, quantity } = req.body;

    try {
        console.log("Estoy antes")
        const result =  await cartManager.addprodtocart(cid, pid, quantity);
        console.log("Finalice")
        if (!result) {
            return res.send('Carro Inexistente');
        }
        else {
            res.status(200).send({ status: 'success' });
            return res.send(result);
        }

    } catch (error) {
        console.log(error);
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const result = cartManager.deletecart(cid);
        if (!result) {
            res.send('Error');
        }
        else {
            res.status(200).send({ status: 'success', payload: result });
        }

    } catch (error) {
        console.log(error);
    }
})

export default router;