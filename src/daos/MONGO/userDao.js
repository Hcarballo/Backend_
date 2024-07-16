import { userModel } from "../../models/users.models.js";

export default class UsersDao {
    constructor() {
        this.userModel = userModel;
    }

    getUsers = async () => {
        try {
            return await this.userModel.find();
        } catch (error) {
            console.log(error);
        }
    }

    createUser = async (user) => {
        try {
           return await this.userModel.create(user);
        } catch (error) {
            console.log(error);
        }
    }

    getUserBy = async (user) => {
        try {
            return await this.userModel.findOne(user);
        } catch (error) {
            console.log(error);
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await this.userModel.findOne(email);
        } catch (error) {
            console.log(error);
        }
    }

}
