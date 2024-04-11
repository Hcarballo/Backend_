import { Router } from 'express';
import ProductsManager from '../managers/productsManager.js';

const router = Router();
const classproducts = new ProductsManager();

router.get('/', async (req, res) => {
    //const classproducts = new ProductsManager();
    const { limit } = req.query;
    try {
        const products = await classproducts.getProducts();
        if (!limit) {
            return res.send(products);
        } else {
            let limitProducts = products.slice(0, parseInt(limit));
            return res.send(limitProducts);
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    //const classproducts = new ProductsManager();
    try {
        const product = await classproducts.getProductsById(parseInt(pid));
        if (!product) {
            return res.send(`El Producto con el código ${pid} no existe`)
        } else {
            return res.send(product);
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

    console.log(req.body);

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.send();
    }
    try {
        await classproducts.addProducts(title, description, price, thumbnail, code, stock)
        res.status(200).send({ status: 'success' });
        console.log("paso x aca")
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

    console.log(`${req.params.pid} - ${JSON.stringify(req.body)}`)

    if (!title || !description || !price || !thumbnail || !code || !stock || status == undefined) {
        return res.send();
    }
    try {
        const product = {id, title, description, price, thumbnail, code, stock, status};
        console.log(product);
        await classproducts.updateProduct(product);
        res.status(200).send({ status: 'success' });
        console.log("paso x aca")
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:pid', async (req, res) => {
const product = req.params.pid;
console.log(product);
   try{
    await classproducts.deleteProduct(Number(product));    
    res.status(200).send({ status: 'success' });
   }catch (error){
    console.log(error);
   }

})



export default router;