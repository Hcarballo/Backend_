import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const productSchema = new Schema({
    pid: Schema.Types.ObjectId,
    quantity: Number,
    unitPrice: Number,
    subtotal: Number
}, {_id: false});

const cartSchema = new Schema({
    products: [productSchema],
    total: Number
});

export const cartModel = model(cartCollection, cartSchema);