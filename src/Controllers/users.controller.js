import { createHash } from "../utils/bcrypt.js";
import { userService } from "../service/index.js";

class UserController {
    constructor() {
        this.service = userService;
    };

    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers();
            if (users.length == 0){
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
            const result = await this.service.getUserBy(uId);
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