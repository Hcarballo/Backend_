import { Router } from 'express';
import ProductController from '../../Controllers/products.controller.js';


const router = Router();
const {
    addProducts,
    getProducts,
    getProductsById,
    deleteProduct,
    updateProduct
} = new ProductController();

router.get('/', getProducts);

router.get('/:pid', getProductsById);

router.post('/', addProducts);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

export default router;