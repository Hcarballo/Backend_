import { userModel } from "../models/users.models.js";

export default class UsersManager {
    constructor() { }

    getUser = async () => {
        const users = await userModel.find().lean();
        return users;
    }

    createUser = async (user) => {
        try {
            await userModel.create(user);
        } catch (error) {
            console.log(error);
        }
    }

    getUserBy = async (user) => {
        return await userModel.findOne(user);
    }

    getUserByEmail = async (email) => {
        return await userModel.findOne(email);
    }

    edad = (date_born) => {
        const hoy = new Date();
        const fechaNac = new Date(date_born);
        const milisegundosEnUnAnio = 31536000000;
        const edadEnMilisegundos = hoy - fechaNac;
        const edad = Math.floor(edadEnMilisegundos / milisegundosEnUnAnio);
        return edad;
    };
}
