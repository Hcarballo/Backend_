import { productModel } from "../models/products.models.js";

export default class ProductsManager {

    constructor() {

    }
    /**
     * 
     * @param {*} codigo 
     * @param {*} nombre 
     * @param {*} imagen 
     * @param {*} uva 
     * @param {*} bodega 
     * @param {*} precio 
     * @param {*} categoria 
     * @returns 
     */

    addProducts = async (codigo, nombre, imagen, uva, bodega, precio, categoria) => {
        try {
            const product = {
                codigo,
                nombre,
                imagen,
                uva,
                bodega,
                precio,
                categoria,
                status: true
            }
            await productModel.create(product);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            const listProducts = await productModel.find({}).lean();
            return listProducts;
        } catch (error) {
            console.log(error);
        }
    }

    getProductsById = async (id) => {
        try {
            const result = await productModel.findByIdAndUpdate(id);
            return result;

        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const result = await productModel.findByIdAndDelete(id);
            return (result);
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (updatedProduct) => {
        try {
            const result = await productModel.updateOne(updatedProduct);
            console.log('Producto modificado');
            return (result);
        } catch (error) {
            console.log(error);
        }
    }
}