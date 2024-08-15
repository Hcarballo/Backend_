import mongoose from "mongoose";
import {expect} from "chai";
import ProductsDao from "../../src/daos/MONGO/productDao.js";

mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/')

const expects = expect;

describe('Set de test con Chai para Productos', () => {
    before(function () {
        this.productdao = new ProductsDao();
    })

    beforeEach(function () {
        //mongoose.connection.collections.products.drop();
        this.timeout(5000);
    })

    it('El Test debe obtener todos los productos en formato arreglo', async function () {
        const result = await this.productdao.getProducts();
        expects(result).to.be.deep.equal([]);
    })

    it('El Test debe crear un producto', async function () {
        let product = {
            codigo: "P001",
            nombre: "Vino A",
            imagen: "sin imagen", 
            uva: "Cabernet Sauvignon", 
            bodega: "Bodega 1", 
            precio: 20, 
            categoria: "Vino", 
            stock: 20, 
            status: "true"        
        }
        const result = await this.productdao.addProducts(product);
        expects(result).to.be.ok(ok);
    })

    it('El Test debe encontrar un producto', async function () {
        let product = {
            codigo: "P002",
            nombre: "Vino A",
            imagen: "sin imagen", 
            uva: "Cabernet Sauvignon", 
            bodega: "Bodega 1", 
            precio: 20, 
            categoria: "Vino", 
            stock: 20, 
            status: "true"        
        }
        const productAdd = await this.productdao.addProducts(product);
        const result = await this.productdao.getProductsBy(product.codigo);
        expects(result).to.be.deep.equal([]);
    })
})