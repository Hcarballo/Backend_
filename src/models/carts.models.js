import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users', 
        required: true
      },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: Number,
            unitprice: Number,
            subtotal: Number
        }]
    },
    total: Number
})

cartSchema.pre('find', function () {
    this.populate('products.product')
})

export const cartModel = model(cartCollection, cartSchema);