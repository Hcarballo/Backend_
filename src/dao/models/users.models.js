import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{
        type: String,
        default: 'user'
    }    
});

userSchema.plugin(mongoosePaginate);
export const userModel = model(userCollection, userSchema);