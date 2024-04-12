import fs from 'fs';
import ProductsManager from './productsManager.js';
import { json } from 'express';

export default class CartManager {
    #path;

    constructor() {
        this.#path = "./src/file/carts.json";
    }

    // getCart = (cId) => {

    // }

    createCart = async () => {
        try {
            let listcart = [];
            let cId = this.generateId();
            let products = [];

            listcart = await this.#read_File(this.#path);

            const cart = {
                cid: cId,
                products: products,
                total: 0
            };

            listcart.push(cart);

            await fs.promises.writeFile(this.#path, JSON.stringify(listcart, null, '\t'), 'utf-8');
            console.log('Carrito Creado');
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 
     * @param {String} cId 
     * @param {Number} pId 
     * @param {Number} quantity 
     * @returns 
     */

    add_productCart = async (cId, pId, quantity) => {
        try {
            const carts = await this.#read_File(this.#path);

            if (!Array.isArray(carts) || carts.length === 0) {
                console.log('No hay carritos disponibles');
                return;
            }
            
            const cartActual = carts.find(c => c.cid === cId);           

            if (!cartActual) {
                console.log(`No se encontró ningún carrito con el id ${cId}`);
                return;
            }

            const classProducts = new ProductsManager();
            const findproduct = await classProducts.getProductsById(pId);

            const priceProduct = findproduct.price;

            const product = {
                item: 0,
                pid: pId,
                quantity: quantity,
                unitPrice: priceProduct,
                subtotal: priceProduct * quantity
            }

            if (cartActual.products.length === 0) {
                product.item = 1;
            } else {
                product.item = cartActual.products[cartActual.products.length - 1].item + 1;
            }

            cartActual.total = total + priceProduct * quantity;
            cartActual.products.push(product);

            await fs.promises.writeFile(this.#path, JSON.stringify(cartActual, null, '\t'));
            console.log("Producto Agregado");
        } catch (error) {
            console.log(error);
        }
    }


    delete_productCart = async (product) => {

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

