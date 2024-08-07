import { productService } from "../service/index.js";

class ProductController {
    constructor() {
        this.service = productService;
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
            res.send();
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
            const result = await this.service.createProduct(newProduct);
            res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            console.log(error);
        }
    };

    getProducts = async (req, res) => {
        try {
            const productsDB = await this.service.getProducts();
            if (!productsDB) {
                res.send('No se encuentran productos');
            } else {
                res.send(productsDB);
            }
        } catch (error) {
            console.log(error);
        }        
    };

    getProductsById = async (req, res) => {
        const { pid } = req.params;
        try {
            const productDB = await this.service.getProductsById(pid);
            if (!productDB) {
                res.send(`El Producto con el código ${pid} no existe`)
            } else {
                 res.send(productDB);
            }
        } catch (error) {
            console.log(error);
        }
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
            res.send();
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
            await this.service.updateProduct({ _id: id }, product);
            res.status(200).send({ status: 'success' });
        } catch (error) {
            console.log(error);
        }
    };

    deleteProduct = async (req, res) => {
        const product = req.params.pid;
        try {
            const result = await this.service.deleteProduct(product);
            res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export default ProductController;