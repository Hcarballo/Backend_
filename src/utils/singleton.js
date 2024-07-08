import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

class Singleton{
    static #instance;
    constructor(){
       mongoose.connect(process.env.MONGO_URL);
    }

    static getInstance(){
        if(this.#instance){
            console.log("ya creada la conexión");
            return this.#instance;
        }
        this.#instance = new Singleton();
        console.log("Conectado x singleton");
        return this.#instance;
    }
}

export default Singleton;