import { createHash } from "../utils/bcrypt.js";
import { userService } from "../service/index.js";
import { parse } from "date-fns";
import { sendEmail } from "../utils/sendEmail.js";

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
                last_connection: `Login - ${new Date().toLocaleString()}`,
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
            const result = await this.service.getUserEmail(email);
            if (!result) {
                return res.send('Usuario no encontrado');
            }
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    };

    updateuser = async (req, res) => {
        return (console.log("NOOOO"))
    }

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

        if (!req.file) {
            return res.send('Error al subir el archivo');
        }
        const user = await this.service.getUser(req.params.uid);
        const name = req.file.filename;
        const reference = req.file.destination;
        const tipo = req.body.tipo;
        user.documents.push({ document: { name, reference, tipo } });
        await this.service.updateUser(user._id, user);
        this.checkDocument(user._id);
        return res.send('Archivo ok');
    }

    checkDocument = async (uid) => {
        const user = await this.service.getUser(uid);

        const isDNI = user.documents.some(doc => doc.document.tipo === "DNI");
        const isDomicilio = user.documents.some(doc => doc.document.tipo === "Domicilio");
        const isCuenta = user.documents.some(doc => doc.document.tipo === "Cuenta");

        if (isDNI && isDomicilio && isCuenta) {
            user.checkPremium = true;
            await this.service.updateUser(user._id, user);
            console.log('El usuario subió los 3 archivos');
            return;
        }
        return;
    };

    edad = (date_born) => {
        const hoy = new Date();
        const fechaNac = new Date(date_born);
        const milisegundosEnUnAnio = 31536000000;
        const edadEnMilisegundos = hoy - fechaNac;
        const edad = Math.floor(edadEnMilisegundos / milisegundosEnUnAnio);
        return edad;
    };

    deleteUsers = async (req, res) => {
        const set = 1; //Setear hora de inactividad
        const users = await this.service.getUsers();
        const now = new Date();
        if (users.length <= 0) {
            return;
        }
        users.forEach(async (user) => {
            const html = '<h4>Usted fue dado de baja del sistema por inactividad</h4>'
            const lastConnectionString = user.last_connection.split(" - ")[1];
            const lastConnection = parse(lastConnectionString, 'dd/MM/yyyy, HH:mm:ss', new Date());
            const diffHours = (now - lastConnection) / (1000 * 60 * 60);

            if (user.role === 'user' || diffHours < set) {
                const del = await this.service.deleteUser(user.id);
                if (del) {
                    await sendEmail(user.email, "Usuario Eliminado", html);                                        
                }
            }
        });
    };

    deleteUser = async (req, res) => {
        const user = req.params.id;
        try {
            await this.service.deleteUser(user);
            return res.redirect('/users');
        } catch (error) {
            return res.redirect('/users');
        }
    }
}

export default UserController;