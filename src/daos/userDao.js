import { userModel } from "../models/users.models.js";

export default class UsersDao {
    constructor() { }

    getUser = async () => {
        return await userModel.find().lean();
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
  
}
