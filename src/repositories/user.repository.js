import UserDto from "../dtos/user.dto.js";

export default class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }

    getUsers = async () => await this.userDao.getUsers();

    getUser = async filter => await this.userDao.getUserBy(filter);
    
    createUser = async (user) => {
        const newUser = new UserDto(user);
        const result = await this.userDao.createUser(newUser);
        return (result);
    }

    //updateUser = async (uid, userToUpdate) => await this.userDao.updateUser(uid,userToUpdate);
    //deleteUser = async uid => await this.userDao.deleteUser(uid);
}