import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/EcomerceDB?retryWrites=true&w=majority&appName=E-Wine');
    console.log('Base de datos conectada');
}

export default connectDB;