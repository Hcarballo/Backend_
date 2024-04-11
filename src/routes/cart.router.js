import { Router } from 'express';
import CartManager from '../managers/cartsManager.js';
const router = Router();

// router.get('/', (req, res) => {

// })


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

router.post('/:cid', async (req, res) => {
    try {
        const cid = JSON.stringify(req.params);
        const { pid, quantity } = req.body;

        console.log(`Router ${cid}, ${Number(pid)}, ${Number(quantity)}`);

        const classManager = new CartManager();

        await classManager.add_productCart(cid, pid, quantity);

        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})


// router.put('/:cid', (req, res) => {
//  const newCart = new CartManager();
//  if (!product || !quantity || quantity <= 0) return res.send();
//  try {
//      newCart.add_productCart(product, quantity);
//     res.status(200).send({ status: 'success' });
//  } catch (error){
//      console.log(error);
//  } 
// })

// router.delete('/:cid', (req, res) => {

// })



export default router;