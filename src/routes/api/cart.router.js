import { Router } from 'express';
import CartController from '../../Controllers/carts.controller.js';

const {
    getCart,
    createCart,
    getCartByID,
    addProductToCart,
    delProductToCart,
    deleteCart,
} = new CartController();

const router = Router();

router.get('/', getCart);

router.get('/create', createCart);

router.get('/:cid', getCartByID);

router.post('/product', addProductToCart);

router.delete('/product/:pid', delProductToCart);

router.delete('/:cid', deleteCart);

export default router;