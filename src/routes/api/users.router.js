import { Router } from "express";
import UserController from "../../Controllers/users.controller.js";

const router = Router();

const {
    getUsers,
    getUserBy,
    createUser,
    //getUserByEmail,
    //updateUser,
    //deleteUser
} = new UserController();



router.get('/', getUsers);
router.get('/:uid', getUserBy);
router.post('/', createUser);
//router.get('/:uid', updateUser);
//router.get('/:uid', deleteUser);

export default router;