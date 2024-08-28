import { Schema, model } from "mongoose";
//import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new Schema({
    fullname: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cardId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['user', 'user-full', 'Premium'],
        default: 'user'
    },
    documents: {
        type: [{
            document: {
                name: String,
                reference: String,
                tipo: String
            }
        }]
    },
    last_connection: { type: String },
    checkPremium: { type: Boolean, default: 0 }
});

//userSchema.plugin(mongoosePaginate);
export const userModel = model(userCollection, userSchema);