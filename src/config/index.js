import Singleton from '../utils/singleton.js'
import dotenv from 'dotenv';

dotenv.config();

export const objectConfig = {
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
    mongo_url: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS
}


export const connectDB = async () => {
    Singleton.getInstance();   
}