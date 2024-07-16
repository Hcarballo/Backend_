import { Router } from "express";
import { passportCall } from "../../middlewares/passportCall.middlewares.js";
import SessionController from "../../Controllers/session.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorizationJwt.js";

const sessionsRouter = Router();
const {
    login,
    register,
    logout,
    funcPassport
} = new SessionController();

sessionsRouter.post('/login', login);

sessionsRouter.post('/register', register);

sessionsRouter.get('/current', passportCall('jwt'), authorization('admin'), funcPassport);

sessionsRouter.get('/logout', logout);

sessionsRouter.get('/github', passport.authenticate('github', { scope: 'user:email' }), async (req, res) => { })

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
})

export default sessionsRouter;