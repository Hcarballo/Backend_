import { Router } from "express";
import UsersManager from "../dao/managers/usersManager.js";
import { createHash, validatePass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { passportCall } from "../middlewares/passportCall.middlewares.js";

export const sessionsRouter = Router();

const userManager = new UsersManager();

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).send({ status: 'error', message: 'Datos incompletos' })
    const userFound = await userManager.getUserByEmail({ email });

    if (!validatePass({ password: userFound.password }, password)) return res.status(401).send({ status: 'error', message: 'No coinciden las credenciales' });
    const token = generateToken({
        id: userFound._id,
        email,
        role: userFound.role
    })

    res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({ status: 'success', message: 'usuario logueado' })
});


sessionsRouter.post('/register', async (req, res) => {
    const { first_name, last_name, password, date_born, email } = req.body;
    if (!email || !password) return res.status(401).send({ status: 'error', message: 'Datos incompletos' });

    const userFound = await userManager.getUserByEmail({ email });

    if (userFound) return res.status(401).send({ status: 'error', message: 'Ususario existente' });

    const newUser = {
        first_name,
        last_name,
        age: userManager.edad(date_born),
        email,
        password: createHash(password)
    }
    console.log(date_born)

    const result = await userManager.createUser(newUser);

    if (!result) return res.status(401).send({ status: 'error', message: 'No se completo el Registro' });

    const token = generateToken({
        email,
    })

    res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true
    }).send({ status: 'success', message: 'usuario registrado' });
});

sessionsRouter.get('/current', passportCall('jwt'), auth('admin'), async (req, res) => {
    res.send('Datos sensibles');
});

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('token');
        res.redirect('/home');
    });
});