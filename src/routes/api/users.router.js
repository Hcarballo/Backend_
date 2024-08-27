import { Router } from "express";
import { uploader } from "../../utils/multer.js";
import UserController from "../../Controllers/users.controller.js";

const router = Router();

const {
    getUsers,
    getUserBy,
    createUser,
    userPremium,
    userDocuments,
    //getUserByEmail,
    //updateUser,
    //deleteUser
} = new UserController();



router.get('/', getUsers);
router.get('/:uid', getUserBy);
router.post('/', createUser);
router.post('/premium/:uid', userPremium);
router.post('/:uid/documents',uploader.single('file'), userDocuments);
//router.get('/:uid', updateUser);
//router.get('/:uid', deleteUser);

export default router;