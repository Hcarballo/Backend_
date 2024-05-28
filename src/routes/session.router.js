import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import UsersManager from "../dao/managers/usersManager.js";
import Swal from 'sweetalert2';

export const sessionsRouter = Router();

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email != email || password != password) return res.send('Login Failed');

    const userFound = await userService.getUserBy({email});

    if(!userFound) return res.status(401).send({status:'error',error:'Usuario no encontrado'})
    req.session.user = {        
        email,
        admin: userFound.role === 'Admin'
    }
    res.redirect('/home');
    //res.send('Login Success');
})

sessionsRouter.get('/current', auth, (req, res) => {
    res.send('Datos sensible que ve el admin');
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err });
        else return res.send('logout');
    })
})

const userService = new UsersManager();

sessionsRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) return res.status(401).send({ status: 'error', error: 'datos incompletos' });

        const userExist = await userService.getUserBy({ email });

        if (userExist) return res.status(401).send({ status: 'error', error: 'el usuaruio existe' });

        const newUser = {
            first_name,
            last_name,
            email,
            password
        }

        const result = await userService.createUser(newUser);

        if (result) {
            res.redirect('/login');
            Swal.fire({
                icon: 'success',
                title: '¡Usuario registrado!',
                text: 'Bienvenido a nuestra plataforma.',
            });
        } else {
            console.log('Error al registrar');
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: 'Por favor, inténtalo nuevamente más tarde.',
            });
        }

    } catch (error) {
        console.log(error);
    }
})


