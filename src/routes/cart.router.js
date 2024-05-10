import { Router } from 'express';
//import CartManager from '../dao/managers/cartsManager.js';
import { cartModel } from '../dao/models/carts.models.js';
import { productModel } from '../dao/models/products.models.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        //const classManager = new CartManager();
        //await classManager.createCart()
        const newCarro = {
            products: [],
            total: 0
        }

        const result = await cartModel.create(newCarro);

        console.log('carro agregado');
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    };
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cartDB = await cartModel.findById(cid);
        if (!cartDB) {
            return res.send('Carro Inexistente');
        }
        else {
            return res.send(cartDB);
        }
        // const classManager = new CartManager();
        // classManager.list_products(cid);
        //res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

router.post('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const { pid, quantity } = req.body;

    try {
        const cartDB = await cartModel.findById(cid);
        let productDB = await productModel.findById(pid);

        if (!cartDB) {
            return res.send('Carro Inexistente');
        }
        else {
            const product = {
                item: cartDB.products.length + 1,
                pid: productDB._id,
                quantity: quantity,
                unitPrice: productDB.price,
                subtotal: productDB.price * quantity
            }
            cartDB.total = cartDB.total + (productDB.price * quantity);
            cartDB.products.push(product);
            await cartModel.findOneAndUpdate(cartDB);
            res.status(200).send({ status: 'success' });
            return res.send(cartDB);            
        }
        // const classManager = new CartManager();
        // await classManager.add_productCart(cid, pid, quantity);
       
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const result = await cartModel.findByIdAndDelete(cid);
        if (!result) {
            res.send('Error');
        }
        else {
            res.status(200).send({ status: 'success', payload: result });
        }
        // const classManager = new CartManager();
        // await classManager.delete_cart(cid);

    } catch (error) {
        console.log(error);
    }
})

export default router;