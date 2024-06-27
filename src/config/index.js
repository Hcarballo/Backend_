import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const objectConfig = {
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
    mongo_url: process.env.MONGO_URL
}


export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL);
    console.log('Base de datos conectada');
}