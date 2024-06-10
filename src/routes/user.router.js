import { Router } from "express";
import UsersManager from "../dao/managers/usersManager.js";

const router = Router();
const usersManager = new UsersManager();

router.get('/', async (req, res) => {
    try {
        const users = await usersManager.getUser();
        if (users.length == 0) return res.send('No hay Usuarios Registrados');
        return res.send(users);
    } catch (error) {
        console.log(error);
    }
})

export default router;