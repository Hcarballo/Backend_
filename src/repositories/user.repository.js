import UserDto from "../dtos/user.dto.js";
import { sendEmail } from "../utils/sendEmail.js";

export default class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }

    getUsers = async () => await this.userDao.getUsers();

    getUser = async filter => await this.userDao.getUserBy(filter);

    getUserEmail = async email => await this.userDao.getUserByEmail(email);

    createUser = async (user) => {
        const newUser = new UserDto(user);
        const result = await this.userDao.createUser(newUser);
        return (result);
    }

    updateUser = async (user, userToUpdate) => {
        const result = await this.userDao.updateUser(user, userToUpdate);
        return (result)
    }
    //deleteUser = async uid => await this.userDao.deleteUser(uid);
}