import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: Number,
        }]
    },
    total: Number
})

// const productSchema = new Schema({
//     pid: Schema.Types.ObjectId, 
//     quantity: Number,
//     unitPrice: Number,
//     subtotal: Number
// }, {_id: false});

// const cartSchema = new Schema({
//     products: [productSchema],
//     total: Number
// });

cartSchema.pre('find', function () {
    this.populate('products.product')
})

export const cartModel = model(cartCollection, cartSchema);