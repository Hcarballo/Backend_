import fs from 'fs';

export default class ProductsManager {
    #path;

    constructor() {
        this.#path = './src/file/products.json';
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

        const product = {
            id: 0,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        }

        try {
            const listProducts = await this.#read_File(this.#path);
            const checkProductCode = listProducts.find(p => p.code === product.code);

            if (checkProductCode) {
                console.log(`El código ${product.code} ya existe`);
                return `El código ${product.code} ya existe`;
            }

            if (listProducts.length === 0) {
                product.id = 1;
            } else {
                product.id = listProducts[listProducts.length - 1].id + 1;
            }

            listProducts.push(product);
            await fs.promises.writeFile(this.#path, JSON.stringify(listProducts, null, '\t'), 'utf-8');
            console.log("Producto Agregado");
        }
        catch (error) {
            console.log(error);
        }
    }

    getProducts = async () => {
        try {
            const listProducts = await this.#read_File(this.#path);
            console.log(listProducts);
            return listProducts;
        } catch (error) {
            console.log(error);
        }
    }

    getProductsById = async (id) => {
        try {
            const listProducts = await this.#read_File(this.#path);
            const findProduct = listProducts.find(p => p.id === id);
            if (findProduct) {
                console.log(`Producto ${id} encontrado: ${findProduct}`);
                return findProduct;
            }
            else {
                console.log(`Producto ${id} No existe`);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const listProducts = await this.#read_File(this.#path);
            const product = listProducts.findIndex(p => p.id === id);
            if (product !== -1) {
                listProducts.splice(product, 1);
                await fs.promises.writeFile(this.#path, JSON.stringify(listProducts, null, '\t'), 'utf-8');
                console.log('Producto Eliminado');
                return;
            } else {
                console.log('El producto que intenta eliminar no existe');
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (updatedProduct) => {
        try {
            let listProducts = await this.#read_File(this.#path);
            const productIndex = listProducts.findIndex(p => p.id === updatedProduct.id);
            console.log(productIndex)
            if (productIndex === -1) {
                console.log('El producto que intenta modificar no existe');
                return;
            }
            listProducts[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.#path, JSON.stringify(listProducts, null, '\t'), 'utf-8');
            console.log('Producto modificado');
        } catch (error) {
            console.log(error);
        }
    }

    #read_File = async (path) => {
        try {
            const datajson = await fs.promises.readFile(path, 'utf-8');
            return JSON.parse(datajson);
        }
        catch {
            return [];
        }
    }
}