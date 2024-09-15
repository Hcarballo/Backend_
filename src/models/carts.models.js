import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                 ref: 'products',
            },
            image: String,
            name: String,
            quantity: Number,
            unitprice: Number,
            subtotal: Number
        }]
    },
    total: Number,
    status: String
})

cartSchema.pre('find', function () {
    this.populate('products.product')
})

export const cartModel = model(cartCollection, cartSchema);