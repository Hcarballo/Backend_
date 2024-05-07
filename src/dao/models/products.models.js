import { Schema, model } from "mongoose";

const productCollection = 'products';

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        require: true,
        unique: true
    },
    stock: Number,
    status: Boolean
});

export const productModel = model(productCollection, productSchema);