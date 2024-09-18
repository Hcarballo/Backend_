import { cartModel } from '../../models/carts.models.js';

export default class CartsDao {
    constructor() {
        this.cartModel =  cartModel;
    }

    getCarts = async () => {
        return await this.cartModel.find();
    };

    createCart = async (cart) => {
        return await this.cartModel.create(cart);
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
        return await this.cartModel.findByIdAndDelete(cid);        
    }
}