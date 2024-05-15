import { cartModel } from '../models/carts.models.js';
import { productModel } from '../models/products.models.js';

export default class CartManager {
    constructor() {

    }

    createCart = async () => {
        const newCart = {
            products: [],
            total: 0
        }        
        await cartModel.create(newCart);
        return;
    }

    findbyid = async (id) => {
        const cartfind = await cartModel.findById(id);
        return (cartfind);
    }

    addprodtocart = async (cid, pid, quantity) => {
        const cartDB = await cartModel.findById(cid);
        let productDB = await productModel.findById(pid);

        const product = {
            item: cartDB.products.length + 1,
            pid: productDB._id,
            quantity: quantity,
            unitPrice: productDB.price,
            subtotal: productDB.price * quantity
        }
        cartDB.total = cartDB.total + (productDB.price * quantity);
        cartDB.products.push(product);
        await cartModel.findOneAndUpdate(cartDB);
        console.log("Estoy en el medio")
        return cartDB;
    }

    delprodtocart = async (pid) => {
        return;
    }

    deletecart = async (cid) => {
        await cartModel.findByIdAndDelete(cid);
        return;
    }



}