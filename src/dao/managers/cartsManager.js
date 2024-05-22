import { cartModel } from '../models/carts.models.js';
import { productModel } from '../models/products.models.js';

export default class CartManager {
    constructor() {

    }

    getCart = async () => {
        await cartModel.find();
        return;
    }

    createCart = async () => {
        await cartModel.create({ products: [], total: 0});
        return;
    }

    findbyid = async (id) => {
        const cartfind = await cartModel.findById(id);
        return (cartfind);
    }

    addprodtocart = async (cid, pid, quantity) => {
        const cart = await cartModel.findOne({ _id: cid });
        let product = await productModel.findById(pid);
        const unitprice = product.price;
        const subtotal = product.price * quantity;
        cart.total = cart.total + product.price * quantity;
        cart.products.push({ product: pid, quantity, unitprice, subtotal });
        const resp = await cartModel.findByIdAndUpdate({ _id: cid }, cart);
    }


    delprodtocart = async (cid, pid) => {
        const cartDB = await cartModel.findById(cid);
        const productIndex = cartDB.products.findIndex(product => product.pid.toString() === pid);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado en el carrito');
        }
        cartDB.total = cartDB.total - cartDB.products[productIndex].subtotal;
        cartDB.products.splice(productIndex, 1);

        await cartModel.findOneAndUpdate({ _id: cid }, cartDB);

        return cartDB;
    }

    deletecart = async (cid) => {
        await cartModel.findByIdAndDelete(cid);
        return;
    }
}