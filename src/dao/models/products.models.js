import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products';

const productSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    imagen: String,
    uva: { type: String, required: true },
    bodega: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
    status: Boolean
});

productSchema.plugin(mongoosePaginate);
export const productModel = model(productCollection, productSchema);