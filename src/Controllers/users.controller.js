import { createHash } from "../utils/bcrypt.js";
import { userService } from "../service/index.js";
import { use } from "chai";

class UserController {
    constructor() {
        this.service = userService;
    };

    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers();
            if (users.length == 0) {
                return res.send('No hay Usuarios Registrados');
            }
            return res.send({ status: 'success', payload: users });
        } catch (error) {
            console.log(error);
        }
    };

    createUser = async (req, res) => {
        const {
            first_name,
            last_name,
            date,
            email,
            password,
        } = req.body;

        if (!first_name || !last_name || !date || !email || !password) return res.send('Error');

        try {
            const newUser = {
                first_name: first_name,
                last_name: last_name,
                age: this.edad(date),
                email: email,
                password: createHash(password)
            }

            const result = await this.service.createUser(newUser);
            if (result) {
                return res.send({ status: 'success', message: 'usuario registrado' });
            }
            return res.status(401).send({ status: 'error', message: 'No se completo el Registro' });

        } catch (error) {
            console.log(error);
        }
    };

    getUserBy = async (req, res) => {
        const { uId } = req.params;
        try {
            const result = await this.service.getUser(uId);
            if (!result) {
                return res.send('Usuario no encontrado');
            }
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    };

    getUserByEmail = async (req, res) => {
        const { email } = req.params;
        try {
            const result = await this.service.getUserByEmail(email);
            if (!result) {
                return res.send('Usuario no encontrado');
            }
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    };

    // updateUser = async (req, res) => {
    // }

    userPremium = async (req, res) => {
        const uId = req.params.uid;
        let result = null;
        try {
            const user = await this.service.getUser(uId);
            if (user && user.checkPremium === 1) {
                const userMod = user;
                userMod.role = "Premium";
                result = await this.service.updateUser(user._id, userMod);
                if (!result) return res.send('Usuario No Modificado');
            }
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    userDocuments = async (req, res) => {
        const tipo = req.body.tipo;
        console.log(tipo);
        console.log(req.params.uid);
        console.log(req.file.filename)
        if (!req.file) {
            return res.send('Error al subir el archivo');
        }
        const user = await this.service.getUser(req.params.uid);
        const name = req.file.filename;
        const reference = req.file.destination;
        user.documents.push(name, reference);
        await this.service.updateUser(user._id, user);
        return res.send('Archivo ok');
    }


    edad = (date_born) => {
        const hoy = new Date();
        const fechaNac = new Date(date_born);
        const milisegundosEnUnAnio = 31536000000;
        const edadEnMilisegundos = hoy - fechaNac;
        const edad = Math.floor(edadEnMilisegundos / milisegundosEnUnAnio);
        return edad;
    };
}

export default UserController;