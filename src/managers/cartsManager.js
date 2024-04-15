import fs from 'fs';
import ProductsManager from './productsManager.js';

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
     * @param {string} cId 
     * @param {number} pId 
     * @param {number} quantity 
     * @returns 
     */

    add_productCart = async (cId, pId, quantity) => {
        try {
            const carts = await this.#read_File(this.#path);

            if (!Array.isArray(carts) || carts.length === 0) {
                console.log('No hay carritos disponibles');
                return;
            }

            const cartActual = carts.find(item => item.cid === cId);

            if (!cartActual) {
                console.log(`No se encontró ningún carrito con el id ${cId}`);
                return;
            }

            const classProducts = new ProductsManager();
            const findproduct = await classProducts.getProductsById(pId);

            const priceProduct = findproduct.price;

            const productInCart = cartActual.products.find(p => p.pid === pId);

            if (productInCart) {

                productInCart.quantity += quantity;
                productInCart.subtotal += priceProduct * quantity;

            } else {

                const product = {
                    item: cartActual.products.length + 1,
                    pid: pId,
                    quantity: quantity,
                    unitPrice: priceProduct,
                    subtotal: priceProduct * quantity
                }
                cartActual.products.push(product);
            }

            cartActual.total = cartActual.total + priceProduct * quantity;
            await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, '\t'));
            console.log("Producto Agregado");
        } catch (error) {
            console.log(error);
        }
    }

    list_products = async (cId) => {
        try {
            const carts = await this.#read_File(this.#path);
    
            if (!Array.isArray(carts) || carts.length === 0) {
                console.log('No hay carritos disponibles');
                return;
            }
    
            const cartActual = carts.find(item => item.cid === cId);
    
            if (!cartActual) {
                console.log(`No se encontró ningún carrito con el id ${cId}`);
                return;
            }
    
            if (cartActual.products.length === 0) {
                console.log(`El carrito con el id ${cId} no tiene productos`);
                return;
            }
    
            console.log(`Productos en el carrito ${cId}:`);
            cartActual.products.forEach(product => {
                console.log(`Item: ${product.item}, Código producto: ${product.pid}, Cantidad: ${product.quantity}, Precio Unitario: ${product.unitPrice}, Subtotal: ${product.subtotal}`);
            });
            console.log(`Total: $${cartActual.total}`)
        } catch (error) {
            console.log(error);
        }
        
    }

    delete_cart = async (cId) => {
        try {
            const carts = await this.#read_File(this.#path);

            if (!Array.isArray(carts) || carts.length === 0) {
                console.log('No hay carritos disponibles');
                return;
            }

            const index = carts.findIndex(item => item.cid === cId);

            if (index === -1) {
                console.log(`No se encontró ningún carrito con el id ${cId}`);
                return;
            }

            carts.splice(index, 1);

            await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, '\t'));
            console.log("Carrito eliminado");
        } catch (error) {
            console.log(error);
        }
    }

    generateId = () => {
        const timestamp = Date.now();
        const numberId = Math.floor(Math.random() * 10000);
        return ((`${timestamp}-${numberId}`).toString());
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

