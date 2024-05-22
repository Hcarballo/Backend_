import { Schema, model } from "mongoose";

const productCollection = 'products';

const productSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    imagen: String,
    uva: {
        type: String,
        required: true
    },
    bodega: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    status: Boolean
});

export const productModel = model(productCollection, productSchema);