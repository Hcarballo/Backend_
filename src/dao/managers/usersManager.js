import { userModel } from "../models/users.models.js";

export default class UsersManager {
    constructor() {

    }

    getUser = async ({ limit = 3, numPage = 2 }) => {
        const users = await userModel.paginate({}, { limit, page: numPage, sort: { price: -1 }, lean: true })
    }

    createUser = async (user) => {
        try {
            const addUser = await userModel.create(user);
            console.log(user.first_name)
            return addUser;
        } catch (error) {
            console.log(error);
        }
    }

    getUserBy = async (filter) => {
        return await userModel.findOne(filter);
    }

    getUserByEmail = async (email) => {
        return await userModel.find((user) => user.email === email);
    }
}
