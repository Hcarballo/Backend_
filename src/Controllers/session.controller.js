import { createHash, validatePass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { userService } from "../service/index.js";
import UserController from "./users.controller.js";

class SessionController {
    constructor() {
        this.service = userService;
    };

    login = async (req, res) => {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({ status: 'error', message: 'Datos incompletos' });
        }

        const userFound = await this.service.getUser({ email });

        if (!userFound) {
            return res.status(400).send({ status: 'error', error: 'Usuario no encontrado' })
        }

        const okPass = validatePass(password, userFound.password);

        if (!okPass) {
            return res.status(401).send({ status: 'error', message: 'No coinciden las credenciales' });
        }

        const token = generateToken({
            id: userFound._id,
            email,
            role: userFound.role,
            first_name: userFound.first_name
        });

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).send({ status: 'success', message: 'usuario logueado' });
    };

    register = async (req, res) => {
        console.log('Entre al registro')
        const userManager = new UserController;
        const { first_name, last_name, password, date_born, email } = req.body;
        if (!email || !password) {
            return res.status(401).send({ status: 'error', message: 'Datos incompletos' });
        }

        const userFound = await this.service.getUser(email)
        if (userFound) {
            return res.status(401).send({ status: 'error', message: 'Usuario existente' });
        }

        const newUser = {
            first_name,
            last_name,
            age: userManager.edad(date_born),
            email,
            password: createHash(password)
        }
        console.log(date_born)

        const result = await this.service.createUser(newUser);

        if (!result) {
            return res.status(401).send({ status: 'error', message: 'No se completo el Registro' });
        }

        const token = generateToken({
            id: userFound._id,
            email,
            role: userFound.role,
            first_name: userFound.first_name
        });

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).send({ status: 'success', message: 'usuario registrado' });
    };

    logout = (req, res) => {
        if (req.cookies.token) {           
            res.clearCookie('token');
            return res.redirect('/home');
        } else {
            return res.status(500).send('No se pudo destruir la sesión');
        }
    };

    funcPassport = async (req, res) => {
        console.log(req.user)
        return res.send('Datos sensibles');
    };
}

export default SessionController;