import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: [],
    total: Number
});

export const cartModel = model(cartCollection, cartSchema);