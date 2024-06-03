import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { createHash, validatePass } from "../utils/bcrypt.js"
import UsersManager from "../dao/managers/usersManager.js";
import Swal from 'sweetalert2';
import passport from "passport";

export const sessionsRouter = Router();

const userService = new UsersManager();

// sessionsRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(401).send('Complete todos los campos');

//     //hardcodeo para Desafio_5 ________________________________________________
//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.user = {
//             first_name: 'CoderHouse',
//             last_name: "",
//             email,
//             role: 'admin'
//         }
//         return res.redirect('/home');       
//     }
//     //______________________________________________________________________________

//     const userFound = await userService.getUserBy({ email });
//     if (userFound.email != email && userFound.password != password) return res.status(400).send({status:'error', error: 'Login Failed'});
//     if(validatePass(password,{password: userFound.password}))return res.status(401).send({status:'error', error:'User not found'})


//     req.session.user = {
//         first_name: userFound.first_name,
//         last_name: userFound.last_name,
//         email,
//         role: userFound.role
//     }
//     res.redirect('/home');
// })

// sessionsRouter.post('/register', async (req, res) => {
//     try {
//         const { first_name, last_name, email, password } = req.body;

//         if (!first_name || !last_name || !email || !password) return res.status(401).send({ status: 'error', error: 'datos incompletos' });

//         const userExist = await userService.getUserBy({ email });

//         if (userExist) return res.status(401).send({ status: 'error', error: 'el usuaruio existe' });

//         const newUser = {
//             first_name,
//             last_name,
//             email,
//             password: await createHash(password)
//         }

//         const result = await userService.createUser(newUser);

//         if (result) {
//             res.redirect('/login');
//             Swal.fire({
//                 icon: 'success',
//                 title: '¡Usuario registrado!',
//                 text: 'Bienvenido a nuestra plataforma.',
//             });
//         } else {
//             console.log('Error al registrar');
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al registrar',
//                 text: 'Por favor, inténtalo nuevamente más tarde.',
//             });
//         }

//     } catch (error) {
//         console.log(error);
//     }
// })

//------------------------------------------------------------------------------------------------------

sessionsRouter.get('/current', auth, (req, res) => {
    res.send('Datos sensible que ve el admin');
})

sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req, res) => {
    res.send({ status: 'success', mesaage: 'User Registrado' });
})
sessionsRouter.post('/failregister', async (req, res) => {
    console.log('Fallo la estrategia');
    res.send({ error: 'failed' });
})
sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Credenciales invalidas' });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email
    }
    req.send({ status: 'success', payload: req.user });
})
sessionsRouter.post('faillogin', (req, res) => {
    res.send({ error: 'Fallo el login' });
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err });
        else
            res.redirect('/home');
    })
    return;
})

sessionsRouter.get('/github', passport.authenticate('github', { scope: 'user:email' }), async (req, res) => { });

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    console.log(`Github envia esto ${req.user}`)
    req.session.user = req.user;
    res.redirect('/home');
});