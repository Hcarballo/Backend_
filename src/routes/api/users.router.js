import { Router } from "express";
import UserController from "../../Controllers/users.controller.js";

const {
    getUsers
} = new UserController();

const router = Router();

router.get('/', getUsers);

// Falta el resto del crud


export default router;