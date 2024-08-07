import { Schema, model } from "mongoose";

const sessionCollection = 'session';

const sessionSchema = new Schema({
    token: {
        type: String,
      }   
})

export const sessionModel = model(cartCollection, cartSchema);