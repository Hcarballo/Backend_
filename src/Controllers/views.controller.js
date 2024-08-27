import { parseJwt } from "../utils/jwt.js"
import { productService, userService } from "../service/index.js";


class viewsController {

    constructor() { }

    home = async (req, res) => {
        try {
            const product = await productService.getProducts();
            if (!req.cookies.token) {
                res.render('home', { first_name: null, uid: null, role: null, products: product, carrito: null });
            }
            else {
                let checkrole = null;
                let cart = null;
                const data = parseJwt(req.cookies.token)
                if (data.role === 'admin') {
                    checkrole = 'success';
                }
                if (req.cookies.tokenCart) {
                    cart = parseJwt(req.cookies.tokenCart);
                    return res.render('home', { first_name: data.first_name, uid: data.id, role: checkrole, products: product, carrito: cart });
                }
                res.render('home', { first_name: data.first_name, uid: data.id, role: checkrole, products: product, carrito: null });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }

    users = async (req, res) => {
        const users = await userService.getUsers();
        res.render('users', { users });
    }

    loaddocuments = (req,res) => {
        const {id} = parseJwt(req.cookies.token);        
        res.render('loaddocuments',{id})
    }

    products = async (req, res) => {
        const products = await productService.getProducts();
        res.render('products', { products });
    }

    detailProduct = async (req, res) => {
        try {
            let id = req.params.pid;
            const productDB = await productService.getProductsById(id);
            let cart = null;
            if (req.cookies.tokenCart) {
                cart = parseJwt(req.cookies.tokenCart);
            }
            return res.render('detailProduct', {
                cid: cart,
                id: productDB._id,
                codigo: productDB.codigo,
                nombre: productDB.nombre,
                imagen: productDB.imagen,
                uva: productDB.uva,
                bodega: productDB.bodega,
                precio: productDB.precio,
                categoria: productDB.categoria,
                stock: productDB.stock,
                status: productDB.status
            });
        } catch (error) {
            console.log(error);
        }

    }

    realtimeproducts = async (req, res) => {
        const products = await productService.getProducts();
        res.render('realTimeProducts', {
            title: "Listado de productos WebSocket",
            products,
        }
        )
    }

    chat = (req, res) => {
        res.render('chat', {})
    }

    login = (req, res) => {
        res.render('login');
    }

    register = (req, res) => {
        res.render('register');
    }

    restablecer = (req, res) => {    
        res.render('restablecer');
    }

    resetpassword = (req, res) => {
        const {email} = parseJwt(req.body.tokenreset);
        if(!tokenreset) return res.status(500).send('Error interno del servidor');
        res.render('resetpassword', { email });
    }

}

export default viewsController;