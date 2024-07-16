import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.middlewares.js";
import { productService, userService } from "../service/index.js";
import { authorization } from "../utils/authorizationJwt.js";
import { parseJwt } from "../utils/jwt.js"

const router = Router();

router.get('/home', async (req, res) => {
    try {
        if (!req.cookies.token) {
            res.render('home', { first_name: null });
        }
        else {
            const data = parseJwt(req.cookies.token)
            console.log(data.first_name)
            res.render('home', { first_name: data.first_name });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
})

router.get('/users', passportCall('jwt'), authorization('admin'), async (req, res) => {
    const users = await userService.getUsers();
    res.render('users', { users });
})

router.get('/products', async (req, res) => {
    const products = await productService.getProducts();
    res.render('products', { products });
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await productService.getProducts();
    res.render('realTimeProducts', {
        title: "Listado de productos WebSocket",
        products,
    })
})

router.get('/chat', (req, res) => {
    res.render('chat', {})
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

export default router;
