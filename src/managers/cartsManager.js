import fs from 'fs';
import ProductsManager from './productsManager.js';
import { pid } from 'process';

export default class CartManager {
    #path;
    #cId;

    constructor() {
        this.#path = "./src/file/carts.json";
        this.#cId = this.generateId();
        this.products = [];
    }

    // getCart = (cId) => {

    // }

    createCart = async () => {
        try {
            const listCart = await this.#read_File(this.#path);
            const cart = {
                cid: this.#cId,
                product: this.products,
                total: 0
            };
            listCart.push(cart);
            await fs.promises.writeFile(this.#path, JSON.stringify(cart, null, '\t'), 'utf-8');
            console.log('Carrito Creado');
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 
     * @param {string} product 
     * @param {number} quatity 
     */

    add_productCart = async (cId, pId, quantity) => {
        try {
            const carts = await this.#read_File(this.#path);
            const cartActual = carts.find(c => c.cid === cId);

            console.log(`Recibo ${cId},${pId},${quantity}`);

            const product = {
                pid: pId,
                quantity: quantity,
                unitPrice: this.getPrice(pId),
                subtotal: unitPrice * quantity
            }

            cartActual.products.push(product);

            console.log(`${product} - ${pid}`);

            await fs.promises.writeFile(this.#path, JSON.stringify(cartActual, null, '\T'));
            console.log("Producto Agregado");
        } catch (error) {
            console.log(error);
        }
    }


    delete_productCart = async (product) => {

    }

    getPrice = (pId) => {
        const products = new ProductsManager();
        const product = products.getProductsById(pId);
        const price = product.price;
        return price;
    }

    generateId = () => {
        const timestamp = Date.now();
        const numberId = Math.floor(Math.random() * 10000);
        return `${timestamp}-${numberId}`;
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

