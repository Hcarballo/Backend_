import { Router } from "express";
import { auth } from "../../middlewares/auth.middlewares.js";
import { passportCall } from "../../middlewares/passportCall.middlewares.js";
import SessionController from "../../Controllers/session.controller.js";


export const sessionsRouter = Router();

const {
    login,
    register,
    logout,
    passportcall
} = new SessionController();

sessionsRouter.post('/login', login);

sessionsRouter.post('/register', register);

sessionsRouter.get('/current', passportCall('jwt'), auth('admin'), passportcall);

sessionsRouter.get('/logout', logout);