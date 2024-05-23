import mongoose from "mongoose";
import { productModel } from "../dao/models/products.models.js";


const vinos =
    [
        { "codigo": "V001", "nombre": "Vino A", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 20, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V002", "nombre": "Vino B", "imagen": "sin imagen", "uva": "Merlot", "bodega": "Bodega 2", "precio": 25, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V003", "nombre": "Vino C", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 18, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V004", "nombre": "Vino D", "imagen": "sin imagen", "uva": "Malbec", "bodega": "Bodega 3", "precio": 22, "categoria": "Vino", "stock": 200, "status": "true" },
        { "codigo": "V005", "nombre": "Vino E", "imagen": "sin imagen", "uva": "Pinot Noir", "bodega": "Bodega 4", "precio": 19, "categoria": "Vino", "stock": 260, "status": "true" },
        { "codigo": "V006", "nombre": "Vino F", "imagen": "sin imagen", "uva": "Chardonnay", "bodega": "Bodega 2", "precio": 24, "categoria": "Espumante", "stock": 210, "status": "true" },
        { "codigo": "V007", "nombre": "Vino G", "imagen": "sin imagen", "uva": "Sauvignon Blanc", "bodega": "Bodega 5", "precio": 26, "categoria": "Vino", "stock": 210, "status": "true" },
        { "codigo": "V008", "nombre": "Vino H", "imagen": "sin imagen", "uva": "Riesling", "bodega": "Bodega 3", "precio": 21, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V009", "nombre": "Vino I", "imagen": "sin imagen", "uva": "Zinfandel", "bodega": "Bodega 1", "precio": 23, "categoria": "Vino", "stock": 206, "status": "true" },
        { "codigo": "V010", "nombre": "Vino J", "imagen": "sin imagen", "uva": "Grenache", "bodega": "Bodega 4", "precio": 27, "categoria": "Vino", "stock": 209, "status": "true" },
        { "codigo": "V011", "nombre": "Vino K", "imagen": "sin imagen", "uva": "Tempranillo", "bodega": "Bodega 2", "precio": 28, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V012", "nombre": "Vino L", "imagen": "sin imagen", "uva": "Sangiovese", "bodega": "Bodega 5", "precio": 29, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V013", "nombre": "Vino M", "imagen": "sin imagen", "uva": "Nebbiolo", "bodega": "Bodega 3", "precio": 30, "categoria": "Vino", "stock": 220, "status": "true" },
        { "codigo": "V014", "nombre": "Vino N", "imagen": "sin imagen", "uva": "Viognier", "bodega": "Bodega 1", "precio": 31, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V015", "nombre": "Vino O", "imagen": "sin imagen", "uva": "Chenin Blanc", "bodega": "Bodega 4", "precio": 32, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V016", "nombre": "Vino P", "imagen": "sin imagen", "uva": "Semillon", "bodega": "Bodega 2", "precio": 33, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V017", "nombre": "Vino Q", "imagen": "sin imagen", "uva": "Moscato", "bodega": "Bodega 5", "precio": 34, "categoria": "Espumante", "stock": 250, "status": "true" },
        { "codigo": "V018", "nombre": "Vino R", "imagen": "sin imagen", "uva": "Pinot Gris", "bodega": "Bodega 3", "precio": 35, "categoria": "Vino", "stock": 240, "status": "true" },
        { "codigo": "V019", "nombre": "Vino S", "imagen": "sin imagen", "uva": "Gewurztraminer", "bodega": "Bodega 1", "precio": 36, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V020", "nombre": "Vino T", "imagen": "sin imagen", "uva": "Cabernet Franc", "bodega": "Bodega 4", "precio": 37, "categoria": "Vino", "stock": 230, "status": "true" },
        { "codigo": "V021", "nombre": "Vino A", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 20, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V022", "nombre": "Vino B", "imagen": "sin imagen", "uva": "Merlot", "bodega": "Bodega 2", "precio": 25, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V023", "nombre": "Vino C", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 18, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V024", "nombre": "Vino D", "imagen": "sin imagen", "uva": "Malbec", "bodega": "Bodega 3", "precio": 22, "categoria": "Vino", "stock": 200, "status": "true" },
        { "codigo": "V025", "nombre": "Vino E", "imagen": "sin imagen", "uva": "Pinot Noir", "bodega": "Bodega 4", "precio": 19, "categoria": "Vino", "stock": 260, "status": "true" },
        { "codigo": "V026", "nombre": "Vino F", "imagen": "sin imagen", "uva": "Chardonnay", "bodega": "Bodega 2", "precio": 24, "categoria": "Espumante", "stock": 210, "status": "true" },
        { "codigo": "V027", "nombre": "Vino G", "imagen": "sin imagen", "uva": "Sauvignon Blanc", "bodega": "Bodega 5", "precio": 26, "categoria": "Vino", "stock": 210, "status": "true" },
        { "codigo": "V028", "nombre": "Vino H", "imagen": "sin imagen", "uva": "Riesling", "bodega": "Bodega 3", "precio": 21, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V029", "nombre": "Vino I", "imagen": "sin imagen", "uva": "Zinfandel", "bodega": "Bodega 1", "precio": 23, "categoria": "Vino", "stock": 206, "status": "true" },
        { "codigo": "V030", "nombre": "Vino J", "imagen": "sin imagen", "uva": "Grenache", "bodega": "Bodega 4", "precio": 27, "categoria": "Vino", "stock": 209, "status": "true" },
        { "codigo": "V031", "nombre": "Vino K", "imagen": "sin imagen", "uva": "Tempranillo", "bodega": "Bodega 2", "precio": 28, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V032", "nombre": "Vino L", "imagen": "sin imagen", "uva": "Sangiovese", "bodega": "Bodega 5", "precio": 29, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V033", "nombre": "Vino M", "imagen": "sin imagen", "uva": "Nebbiolo", "bodega": "Bodega 3", "precio": 30, "categoria": "Vino", "stock": 220, "status": "true" },
        { "codigo": "V034", "nombre": "Vino N", "imagen": "sin imagen", "uva": "Viognier", "bodega": "Bodega 1", "precio": 31, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V035", "nombre": "Vino O", "imagen": "sin imagen", "uva": "Chenin Blanc", "bodega": "Bodega 4", "precio": 32, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V036", "nombre": "Vino P", "imagen": "sin imagen", "uva": "Semillon", "bodega": "Bodega 2", "precio": 33, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V037", "nombre": "Vino Q", "imagen": "sin imagen", "uva": "Moscato", "bodega": "Bodega 5", "precio": 34, "categoria": "Espumante", "stock": 250, "status": "true" },
        { "codigo": "V038", "nombre": "Vino R", "imagen": "sin imagen", "uva": "Pinot Gris", "bodega": "Bodega 3", "precio": 35, "categoria": "Vino", "stock": 240, "status": "true" },
        { "codigo": "V039", "nombre": "Vino S", "imagen": "sin imagen", "uva": "Gewurztraminer", "bodega": "Bodega 1", "precio": 36, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V040", "nombre": "Vino T", "imagen": "sin imagen", "uva": "Cabernet Franc", "bodega": "Bodega 4", "precio": 37, "categoria": "Vino", "stock": 230, "status": "true" },
        { "codigo": "V041", "nombre": "Vino A", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 20, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V042", "nombre": "Vino B", "imagen": "sin imagen", "uva": "Merlot", "bodega": "Bodega 2", "precio": 25, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V043", "nombre": "Vino C", "imagen": "sin imagen", "uva": "Cabernet Sauvignon", "bodega": "Bodega 1", "precio": 18, "categoria": "Vino", "stock": 30, "status": "true" },
        { "codigo": "V044", "nombre": "Vino D", "imagen": "sin imagen", "uva": "Malbec", "bodega": "Bodega 3", "precio": 22, "categoria": "Vino", "stock": 200, "status": "true" },
        { "codigo": "V045", "nombre": "Vino E", "imagen": "sin imagen", "uva": "Pinot Noir", "bodega": "Bodega 4", "precio": 19, "categoria": "Vino", "stock": 260, "status": "true" },
        { "codigo": "V046", "nombre": "Vino F", "imagen": "sin imagen", "uva": "Chardonnay", "bodega": "Bodega 2", "precio": 24, "categoria": "Espumante", "stock": 210, "status": "true" },
        { "codigo": "V047", "nombre": "Vino G", "imagen": "sin imagen", "uva": "Sauvignon Blanc", "bodega": "Bodega 5", "precio": 26, "categoria": "Vino", "stock": 210, "status": "true" },
        { "codigo": "V048", "nombre": "Vino H", "imagen": "sin imagen", "uva": "Riesling", "bodega": "Bodega 3", "precio": 21, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V049", "nombre": "Vino I", "imagen": "sin imagen", "uva": "Zinfandel", "bodega": "Bodega 1", "precio": 23, "categoria": "Vino", "stock": 206, "status": "true" },
        { "codigo": "V050", "nombre": "Vino J", "imagen": "sin imagen", "uva": "Grenache", "bodega": "Bodega 4", "precio": 27, "categoria": "Vino", "stock": 209, "status": "true" },
        { "codigo": "V051", "nombre": "Vino K", "imagen": "sin imagen", "uva": "Tempranillo", "bodega": "Bodega 2", "precio": 28, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V052", "nombre": "Vino L", "imagen": "sin imagen", "uva": "Sangiovese", "bodega": "Bodega 5", "precio": 29, "categoria": "Vino", "stock": 120, "status": "true" },
        { "codigo": "V053", "nombre": "Vino M", "imagen": "sin imagen", "uva": "Nebbiolo", "bodega": "Bodega 3", "precio": 30, "categoria": "Vino", "stock": 220, "status": "true" },
        { "codigo": "V054", "nombre": "Vino N", "imagen": "sin imagen", "uva": "Viognier", "bodega": "Bodega 1", "precio": 31, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V055", "nombre": "Vino O", "imagen": "sin imagen", "uva": "Chenin Blanc", "bodega": "Bodega 4", "precio": 32, "categoria": "Vino", "stock": 20, "status": "true" },
        { "codigo": "V056", "nombre": "Vino P", "imagen": "sin imagen", "uva": "Semillon", "bodega": "Bodega 2", "precio": 33, "categoria": "Vino", "stock": 205, "status": "true" },
        { "codigo": "V057", "nombre": "Vino Q", "imagen": "sin imagen", "uva": "Moscato", "bodega": "Bodega 5", "precio": 34, "categoria": "Espumante", "stock": 250, "status": "true" },
        { "codigo": "V058", "nombre": "Vino R", "imagen": "sin imagen", "uva": "Pinot Gris", "bodega": "Bodega 3", "precio": 35, "categoria": "Vino", "stock": 240, "status": "true" },
        { "codigo": "V059", "nombre": "Vino S", "imagen": "sin imagen", "uva": "Gewurztraminer", "bodega": "Bodega 1", "precio": 36, "categoria": "Vino", "stock": 320, "status": "true" },
        { "codigo": "V060", "nombre": "Vino T", "imagen": "sin imagen", "uva": "Cabernet Franc", "bodega": "Bodega 4", "precio": 37, "categoria": "Vino", "stock": 230, "status": "true" }
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
            $group: { _id: '$bodega', total: { $sum: '$stock' } }
        },
        {
            $sort: { total: -1 }
        }
    ])

    console.log(result);

}

