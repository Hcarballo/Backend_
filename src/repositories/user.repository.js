import UserDto from "../dtos/user.dto.js";

export default class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }


    getUsers = async () => await this.userDao.getUser();

    getUser = async filter => await this.userDao.getUserBy(filter);
    
    createUser = async (user) => {
        const newUser = new UserDto(user);
        return await this.userDao.createUser(newUser);
    }

    //updateUser = async (uid, userToUpdate) => await this.userDao.updateUser(uid,userToUpdate);
    //deleteUser = async uid => await this.userDao.deleteUser(uid);
}