import { cartModel } from '../models/carts.models.js';
import { productModel } from '../models/products.models.js';

export default class CartManager {
    constructor() {

    }

    createCart = async () => {
        await cartModel.create({ products: [], quantity: Number });
        return;
    }

    findbyid = async (id) => {
        const cartfind = await cartModel.findById(id);
        return (cartfind);
    }

    addprodtocart = async (cid, pid, quantity) => {
        const cart = await cartModel.findOne({ _id: cid });
        cart.products.push({ product: pid, quantity });
        const resp = await cartModel.findByIdAndUpdate({ _id: cid }, cart);
    }

    // addprodtocart = async (cid, pid, quantity) => {
    //     const cartDB = await cartModel.findById(cid);
    //     let productDB = await productModel.findById(pid);

    //     const product = {
    //         item: cartDB.products.length + 1,
    //         pid: productDB._id,
    //         quantity: quantity,
    //         unitPrice: productDB.price,
    //         subtotal: productDB.price * quantity
    //     }

    //     cartDB.total = cartDB.total + (productDB.price * quantity);
    //     cartDB.products.push(product);
    //     await cartModel.findOneAndUpdate({ _id: cid }, cartDB);
    //     return cartDB;
    // }

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