import { Router } from 'express';
import ProductsManager from '../dao/managers/productsManager.js';
import { productModel } from '../dao/models/products.models.js';

const router = Router();
const classproducts = new ProductsManager();

router.get('/', async (req, res) => {

    const { limit } = req.query;
    try {
        const productsDB = await productModel.find({});
        //const products = await classproducts.getProducts();
        if (!limit) {
            return res.send(productsDB);
            //return res.send(products);
        } else {
            let limitProducts = productsDB.slice(0, parseInt(limit));
            //let limitProducts = products.slice(0, parseInt(limit));
            return res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const productDB = await productModel.getProductsById(parseInt(pid))
        //const product = await classproducts.getProductsById(parseInt(pid));
        if (!productDB) {
            return res.send(`El Producto con el código ${pid} no existe`)
        } else {
            return res.send(productDB);
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/', async (req, res) => {
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.send();
    }
    try {
        const newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: true
        }
        const result = await productModel.create(newProduct);
        //await classproducts.addProducts(title, description, price, thumbnail, code, stock)
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
})

router.put('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status
    } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock || status == undefined) {
        return res.send();
    }
    try {
        const product = { id, title, description, price, thumbnail, code, stock, status };
        await productModel.updateOne({_id: id}, product);
        //await classproducts.updateProduct(product);
        res.status(200).send({ status: 'success' });        
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    const product = req.params.pid;
    console.log(product);
    try {
        const result = await productModel.deleteOne(Number(product));
        // const result = await classproducts.deleteProduct(Number(product));
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }

})

export default router;