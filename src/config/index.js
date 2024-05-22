import mongoose from "mongoose";
import { productModel } from "../dao/models/products.models.js";


const vinos =
    [
        { "codigo": "V001", "nombre": "Vino A", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 20, "categoria": "Vino", "status": "true" },
        { "codigo": "V002", "nombre": "Vino B", "imagen": "sin imagen", "uva": "Merlot", "bodega": "Bodega 2", "precio": 25, "categoria": "Vino" },
        { "codigo": "V003", "nombre": "Vino C", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 18, "categoria": "Vino", "status": "true" },
        { "codigo": "V004", "nombre": "Vino D", "imagen": "sin imagen", "uva": "Malbec", "bodega": "Bodega 3", "precio": 22, "categoria": "Vino", "status": "true" },
        { "codigo": "V005", "nombre": "Vino E", "imagen": "sin imagen", "uva": "Pinot Noir", "bodega": "Bodega 4", "precio": 19, "categoria": "Vino", "status": "true" },
        { "codigo": "V006", "nombre": "Vino F", "imagen": "sin imagen", "uva": "Chardonnay", "bodega": "Bodega 2", "precio": 24, "categoria": "Espumante", "status": "true" },
        { "codigo": "V007", "nombre": "Vino G", "imagen": "sin imagen", "uva": "Sauvignon Blanc", "bodega": "Bodega 5", "precio": 26, "categoria": "Vino", "status": "true" },
        { "codigo": "V008", "nombre": "Vino H", "imagen": "sin imagen", "uva": "Riesling", "bodega": "Bodega 3", "precio": 21, "categoria": "Vino", "status": "true" },
        { "codigo": "V009", "nombre": "Vino I", "imagen": "sin imagen", "uva": "Zinfandel", "bodega": "Bodega 1", "precio": 23, "categoria": "Vino", "status": "true" },
        { "codigo": "V010", "nombre": "Vino J", "imagen": "sin imagen", "uva": "Grenache", "bodega": "Bodega 4", "precio": 27, "categoria": "Vino", "status": "true" },
        { "codigo": "V011", "nombre": "Vino K", "imagen": "sin imagen", "uva": "Tempranillo", "bodega": "Bodega 2", "precio": 28, "categoria": "Vino", "status": "true" },
        { "codigo": "V012", "nombre": "Vino L", "imagen": "sin imagen", "uva": "Sangiovese", "bodega": "Bodega 5", "precio": 29, "categoria": "Vino", "status": "true" },
        { "codigo": "V013", "nombre": "Vino M", "imagen": "sin imagen", "uva": "Nebbiolo", "bodega": "Bodega 3", "precio": 30, "categoria": "Vino", "status": "true" },
        { "codigo": "V014", "nombre": "Vino N", "imagen": "sin imagen", "uva": "Viognier", "bodega": "Bodega 1", "precio": 31, "categoria": "Vino", "status": "true" },
        { "codigo": "V015", "nombre": "Vino O", "imagen": "sin imagen", "uva": "Chenin Blanc", "bodega": "Bodega 4", "precio": 32, "categoria": "Vino", "status": "true" },
        { "codigo": "V016", "nombre": "Vino P", "imagen": "sin imagen", "uva": "Semillon", "bodega": "Bodega 2", "precio": 33, "categoria": "Vino", "status": "true" },
        { "codigo": "V017", "nombre": "Vino Q", "imagen": "sin imagen", "uva": "Moscato", "bodega": "Bodega 5", "precio": 34, "categoria": "Espumante", "status": "true" },
        { "codigo": "V018", "nombre": "Vino R", "imagen": "sin imagen", "uva": "Pinot Gris", "bodega": "Bodega 3", "precio": 35, "categoria": "Vino", "status": "true" },
        { "codigo": "V019", "nombre": "Vino S", "imagen": "sin imagen", "uva": "Gewurztraminer", "bodega": "Bodega 1", "precio": 36, "categoria": "Vino", "status": "true" },
        { "codigo": "V020", "nombre": "Vino T", "imagen": "sin imagen", "uva": "Cabernet Franc", "bodega": "Bodega 4", "precio": 37, "categoria": "Vino", "status": "true" }
    ]

export const connectDB = async () => {
    mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/EcomerceDB?retryWrites=true&w=majority&appName=E-Wine');
    console.log('Base de datos conectada');

    // try {
    //     let result = await productModel.insertMany(vinos);
    //     console.log(result);
    // } catch (error) {
    //     console.error(error);
    // }

    let result = await productModel.aggregate([
        {
            $match: { categoria: 'Vino' }
        },
        {
            $group: { _id: '$bodega' , total: {$sum: '$precio'}}
        }
    ])

    console.log(result);

}

