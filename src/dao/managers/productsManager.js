import { productModel } from "../models/products.models.js";

export default class ProductsManager {

    constructor() {

    }
    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {string} thumbnail 
     * @param {string} code 
     * @param {number} stock 
     * @param {boolean} status  
     */

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        try {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
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