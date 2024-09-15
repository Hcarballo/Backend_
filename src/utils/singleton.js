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
            return this.#instance;
        }
        this.#instance = new Singleton();
        return this.#instance;
    }
}

export default Singleton;