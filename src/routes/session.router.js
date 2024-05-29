import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import UsersManager from "../dao/managers/usersManager.js";
import Swal from 'sweetalert2';

export const sessionsRouter = Router();

const userService = new UsersManager();

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send('Complete todos los campos');

    //hardcodeo para Desafio_5 ________________________________________________
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            first_name: 'CoderHouse',
            last_name: "",
            email,
            role: 'admin'
        }
        return res.redirect('/home');       
    }
    //______________________________________________________________________________

    const userFound = await userService.getUserBy({ email });
    if (userFound.email != email && userFound.password != password) return res.send('Login Failed');

    req.session.user = {
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email,
        role: userFound.role
    }
    res.redirect('/home');
})

sessionsRouter.get('/current', auth, (req, res) => {
    res.send('Datos sensible que ve el admin');
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err });
        else
            res.redirect('/home');
    })
    return;
})

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
    return;
})


