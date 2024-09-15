import { userModel } from "../../models/users.models.js";

export default class UsersDao {
    constructor() {
        this.userModel = userModel;
    }

    getUsers = async () => {
        try {
            return await this.userModel.find().lean();
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

    getUserBy = async (uid) => {
        try {
            return await this.userModel.findById(uid);
        } catch (error) {
            console.log(error);
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await this.userModel.findOne({email});
        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async (user, userToUpdate) => {
        try {
            return await this.userModel.findOneAndUpdate(user,userToUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    deleteUser = async (user) => {
        try {
           return await this.userModel.deleteOne(user);            
        } catch (error) {
            console.log(error);
        }
    }
}
