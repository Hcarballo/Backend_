import { cartModel } from '../models/carts.models.js';

export default class CartDao {
    constructor() {

    }

    getCart = async () => {
        return await cartModel.find();
    };

    createCart = async () => {
        return await cartModel.create({ products: [], total: 0 });
    };

    getCartByID = async (id) => {
        return await cartModel.findById(id);
    }

    addprodtocart = async (cid, cart) => {
        return await cartModel.findByIdAndUpdate({ _id: cid }, cart);
    }


    delprodtocart = async (cid, cart) => {
        return await cartModel.findOneAndUpdate({ _id: cid }, cart);
    }

    deletecart = async (cid) => {
        await cartModel.findByIdAndDelete(cid);
        return;
    }
}