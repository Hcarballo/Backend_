import { createHash, validatePass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import UserController from "./users.controller.js";
import UsersDao from "../daos/userDao.js";

const {
    getUserByEmail,
    createUser
} = new UsersDao();

const userManager = new UserController();

class SessionController {
    constructor() { };

    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).send({ status: 'error', message: 'Datos incompletos' })
        const userFound = await getUserByEmail({ email });

        if (!validatePass({ password: userFound.password }, password)) return res.status(401).send({ status: 'error', message: 'No coinciden las credenciales' });
        const token = generateToken({
            id: userFound._id,
            email,
            role: userFound.role
        });

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).send({ status: 'success', message: 'usuario logueado' });
    };

    register = async (req, res) => {
        const { first_name, last_name, password, date_born, email } = req.body;
        if (!email || !password) return res.status(401).send({ status: 'error', message: 'Datos incompletos' });

        const userFound = await getUserByEmail({ email });

        if (userFound) return res.status(401).send({ status: 'error', message: 'Ususario existente' });

        const newUser = {
            first_name,
            last_name,
            age: userManager.edad(date_born),
            email,
            password: createHash(password)
        }
        console.log(date_born)

        const result = await createUser(newUser);

        if (!result) return res.status(401).send({ status: 'error', message: 'No se completo el Registro' });

        const token = generateToken({
            email,
        })

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).send({ status: 'success', message: 'usuario registrado' });
    };

    logout = (req, res) => {
        if (req.session) {
            req.session.destroy();
            res.clearCookie('token');
            res.redirect('/home');
        } else {
           res.status(500).send('No se pudo destruir la sesión');
        }
    };

    passportcall = async (req, res) => {
        res.send('Datos sensibles');
    };
}

export default SessionController;