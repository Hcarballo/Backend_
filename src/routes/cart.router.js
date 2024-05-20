import { Router } from 'express';
import CartManager from '../dao/managers/cartsManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
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

router.post('/:cid', (req, res) => {
    const cid = req.params.cid;
    const { pid, quantity } = req.body;
    try {
        const result = cartManager.addprodtocart(cid, pid, quantity);
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

router.delete('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const result = cartManager.delprodtocart(cid, pid);
        if (!result) {
            return res.send('El producto no existe');
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