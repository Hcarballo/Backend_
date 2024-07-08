import { productService } from "../service/index.js";

class ProductController {
    constructor() {
        this.productService = productService;
    };

    addProducts = async (req, res) => {
        const {
            codigo,
            nombre,
            imagen,
            uva,
            bodega,
            precio,
            categoria,
            stock,
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
            const result = await this.productService.addProducts(newProduct);
            res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            console.log(error);
        }
        return;
    };

    getProducts = async (req, res) => {
        try {
            const productsDB = await this.productService.getProducts();
            if(!productsDB){
                return res.send('No se encuentran productos');
            }
            return res.send(productsDB);
        }

        catch (error) {
            console.log(error);
        }
        return;
    };

    getProductsById = async (req, res) => {
        const { pid } = req.params;
        try {
            const productDB = await this.productService.getProductsById(pid);
            if (!productDB) {
                return res.send(`El Producto con el código ${pid} no existe`)
            } else {
                return res.send(productDB);
            }
        } catch (error) {
            console.log(error);
        }
        return;
    };

    updateProduct = async (req, res) => {
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
            await this.productService.updateProduct({ _id: id }, product);
            res.status(200).send({ status: 'success' });
        } catch (error) {
            console.log(error);
        }
    };

    deleteProduct = async (req, res) => {
        const product = req.params.pid;
        try {
            const result = await this.productService.deleteProduct(product);
            res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            console.log(error);
        }
        return;
    };
}

export default ProductController;