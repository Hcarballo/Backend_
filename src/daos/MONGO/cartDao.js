import { cartModel } from '../../models/carts.models.js';

export default class CartsDao {
    constructor() {
        this.cartModel =  cartModel;
    }

    getCart = async () => {
        return await this.cartModel.find();
    };

    createCart = async () => {
        return await this.cartModel.create({ products: [], total: 0 });
    };

    getCartByID = async (id) => {
        return await this.cartModel.findById(id);
    }

    addprodtocart = async (cid, cart) => {
        return await this.cartModel.findByIdAndUpdate({ _id: cid }, cart);
    }


    delprodtocart = async (cid, cart) => {
        return await this.cartModel.findOneAndUpdate({ _id: cid }, cart);
    }

    deletecart = async (cid) => {
        await this.cartModel.findByIdAndDelete(cid);
        return;
    }
}