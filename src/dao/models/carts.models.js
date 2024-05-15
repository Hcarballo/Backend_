import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type:[{
            product:{
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity:Number,
            unitPrice: Number,
            subtotal: Number,
        }]
    },
    total: Number
});

export const cartModel = model(cartCollection, cartSchema);