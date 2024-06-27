import mongoose, { connect } from "mongoose";
import dotenv from 'dotenv';

export class Singleton{
    static #instance;
    constructor(){
        connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/EcomerceDB?retryWrites=true&w=majority&appName=E-Wine');
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