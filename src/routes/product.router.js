import { Router } from 'express';
import { productModel } from '../dao/models/products.models.js';

const router = Router();

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const productsDB = await productModel.find({}).lean();
        console.log('pase por el get del router')
        if (!limit) {
            return res.send(productsDB);
        } else {
            let limitProducts = productsDB.slice(0, parseInt(limit));
            return res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log('pase por el get/:id del router')
    try {
        const productDB = await productModel.findById(pid);
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
        console.log('pase por el post del router')
        const result = await productModel.create(newProduct);
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
})

router.put('/:pid', async (req, res) => {
    const id = req.params.pid;
    const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status
    } = req.body;
    console.log('pase por el put del router')
    if (!title || !description || !price || !thumbnail || !code || !stock || status == undefined) {
        return res.send();
    }
    try {
        const product = { title, description, price, thumbnail, code, stock, status };
        await productModel.updateOne({ _id: id }, product);
        res.status(200).send({ status: 'success' });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
    const product = req.params.pid;
    console.log('pase por el delete del router')
    try {
        const result = await productModel.findByIdAndDelete(product);
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
})

export default router;