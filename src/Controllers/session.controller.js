import { createHash, validatePass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { userService } from "../service/index.js";
import UserController from "./users.controller.js";
import { sendEmail } from "../utils/sendEmail.js";

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
        }).redirect('/home');
    };

    register = async (req, res) => {
        const userManager = new UserController;
        const { first_name, last_name, password, date_born, email } = req.body;
        if (!email || !password) {
            return res.status(401).send({ status: 'error', message: 'Datos incompletos' });
        }
        const userFound = await this.service.getUserEmail(email)
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

        const result = await this.service.createUser(newUser);

        if (!result) {
            return res.status(401).send({ status: 'error', message: 'No se completo el Registro' });
        }

        const token = generateToken({
            id: result._id,
            email,
            role: result.role,
            first_name: result.first_name
        });

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
        }).redirect('/home');
    };

    restablecer = async (req, res) => {
        const { email } = req.body;
        // const ifresult = await this.service.getUserEmail(email);
        // if(!ifresult){
        //     return res.status(401).send({ status: 'error', message: 'Usuario Inexistente' });
        // }
        const tokenreset = generateToken({
            email,
        });
        res.cookie('tokenreset', tokenreset, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        });



        const html = `<h1>Siga este enlace para restablecer su contraseña:</h1> <a href="/api/session/resetpassword/${tokenreset}">LINK</a>`;
        const result = await sendEmail(email, "Recupero de Contraseña", html);
        if (result) return res.send('Email enviado a su casilla');
        return res.status(500).send('No se pudo completar el envio');
    }

    resetpassword = async (req, res) => {
        //desarmar el token
        const { email, newpassword } = req.body;
        try {
            const user = await this.service.getUserEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const okPass = validatePass(newpassword, user.password);

            if (okPass) {
                return res.status(404).json({ message: 'No puede utilizar la misma contraseña' });
            }

            const newUser = user;
            newUser.password = createHash(newpassword);
            await this.service.updateUser(user, newUser);

            return res.status(200).json({ message: 'Contraseña restablecida correctamente' });
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    logout = (req, res) => {
        if (req.cookies.token) {
            res.clearCookie('token');
            if (req.cookies.tokenCart) {
                res.clearCookie('tokenCart');
            }
            res.redirect('/home');
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