import { Router } from 'express';
import ProductsManager from '../dao/managers/productsManager.js';


const router = Router();
const productManager = new ProductsManager();

router.get('/', async (req, res) => {
    
    const { limit } = req.query;
    try {
        const productsDB = await productManager.getProducts();
        if (!limit) {
            return res.send(productsDB);
        } else {
            let limitProducts = productsDB.slice(0, parseInt(limit));
            return res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
    return;
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const productDB = await productManager.getProductsById(pid);
        if (!productDB) {
            return res.send(`El Producto con el código ${pid} no existe`)
        } else {
            return res.send(productDB);
        }
    } catch (error) {
        console.log(error);
    }
    return;
})

router.post('/', async (req, res) => {
    const {
        codigo,
        nombre,
        imagen,
        uva,
        bodega,
        precio,
        categoria,
        stock
    } = req.body;

    if (!codigo || !nombre || !imagen || !uva || !bodega || !precio || !categoria || !stock) {
        return res.send();
    }
    try {
        const newProduct = {
            codigo: codigo,
            nombre: nombre,
            imagen: imagen,
            uva: uva,
            bodega: bodega,
            precio: precio,
            categoria: categoria,
            stock: stock,
            status: true
        }
        const result = await productManager.addProducts(newProduct);
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
    return;
})

router.put('/:pid', async (req, res) => {
    const id = req.params.pid;
    const {
        codigo,
        nombre,
        imagen,
        uva,
        bodega,
        precio,
        categoria,
        stock,
        status

    } = req.body;

    if (!codigo || !nombre || !imagen || !uva || !bodega || !precio || !categoria || stock || status == undefined) {
        return res.send();
    }
    try {
        const product = {
            codigo,
            nombre,
            imagen,
            uva,
            bodega,
            precio,
            categoria,
            stock,
            status: true
        };
        await productManager.updateProduct({ _id: id }, product);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    const product = req.params.pid;
    try {
        const result = await productManager.deleteProduct(product);
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
    return;
})

export default router;