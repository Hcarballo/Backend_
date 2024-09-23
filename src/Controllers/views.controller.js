import { parseJwt } from "../utils/jwt.js"
import { productService, userService, cartService } from "../service/index.js";
import { now } from "mongoose";

class viewsController {

    constructor() { }

    home = async (req, res) => {
        try {

            const dataInit = await this.configurationInit(req);

            return res.render('home', { dataInit });

        } catch (error) {
            console.log(error)
            return res.status(500).send('Error interno del servidor');
        }
    }

    users = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        const users = await userService.getUsers();
        return res.render('users', { users, dataInit });
    }

    updateuser = async (req, res) => {
        try {
            let dataInit = await this.configurationInit(req);
            const uid = req.params.uid;
            const user = await userService.getUser(uid);
            return res.render('updateuser', {
                Nombre: user.first_name,
                Apellido: user.last_name,
                Fecha_Nac: user.birthday,
                Foto_Perfil_URL: user.foto_perfil,
                Email: user.email,
                Role: user.role,
                Checkpremium: user.checkPremium,
                dataInit
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }


    cart = async (req, res) => {
        try {
            const tokencart = parseJwt(req.cookies.tokenCart);

            if (tokencart) {
                const cart = await cartService.getCartByID(tokencart.id);
                const isModal = 'true';

                const products = cart.products.map(product => ({
                    ...product,
                    product: product.product.toString(),
                    name: product.name.toString(),
                    image: product.image.toString(),
                    quantity: product.quantity.toString(),
                    unitprice: product.unitprice.toString(),
                    subtotal: product.subtotal.toString(),
                    _id: product._id.toString()
                }));

                return res.render('cart', {
                    id: cart._id,
                    products: products,
                    total: cart.total,
                    isModal
                });
            }
            return res.status(500).send('');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }

    }

    loaddocuments = (req, res) => {
        const { id } = parseJwt(req.cookies.token);
        return res.render('loaddocuments', { id })
    }

    products = async (req, res) => {
        try {
            let dataInit = await this.configurationInit(req);
            const products = await productService.getProducts();
            return res.render('products', { products, dataInit });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    listproducts = async (req, res) => {
        try {
            let dataInit = await this.configurationInit(req);
            const products = await productService.getProducts();
            return res.render('listProducts', { products, dataInit });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    detailProduct = async (req, res) => {
        try {
            let id = req.params.pid;
            let dataInit = await this.configurationInit(req);
            const productDB = await productService.getProductsById(id);
            let cart = null;
            if (req.cookies.tokenCart) {
                cart = parseJwt(req.cookies.tokenCart);
            }

            const isModal = 'true';

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
                status: productDB.status,
                dataInit,
                isModal
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    realtimeproducts = async (req, res) => {
        const products = await productService.getProducts();
        try {
            return res.render('realTimeProducts', {
                title: "Listado de productos WebSocket",
                products,
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    chat = (req, res) => {
        return res.render('chat', {})
    }

    login = (req, res) => {
        return res.render('login');
    }

    register = (req, res) => {
        return res.render('register');
    }

    restablecer = (req, res) => {
        return res.render('restablecer');
    }

    resetpassword = (req, res) => {
        const { email } = parseJwt(req.body.tokenreset);
        if (!tokenreset) return res.status(500).send('Error interno del servidor');
        return res.render('resetpassword', { email });
    }

    estilos = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        return res.render('estilos', { dataInit })
    }

    bodegas = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        return res.render('bodegas', { dataInit })
    }

    historia = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        return res.render('historia', { dataInit })
    }

    premiados = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        return res.render('premiados', { dataInit })
    }

    proxcatas = async (req, res) => {
        let dataInit = await this.configurationInit(req);
        return res.render('proximascatas', { dataInit })
    }


    factura = async (req, res) => {
        try {
            const dataInit = await this.configurationInit(req);
            const cart = JSON.parse(JSON.stringify(dataInit.cart));
            const isModal = 'true';
            if (!dataInit) {
                res.send('Error');
            }
            else {
                return res.render('factura', {
                    dataInit,
                    date: dataInit.date,
                    customer: dataInit.first_name,
                    cid: cart._id,
                    total: cart.total,
                    products: cart.products,
                    isModal
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    configurationInit = async (req) => {
        const fecha = new Date();
        const formatfecha = fecha.toLocaleDateString('es-AR', {
            year: "numeric",
            month: '2-digit',
            day: '2-digit'
        });
        const products = await productService.getProducts();

        let cfg = {
            first_name: null,
            uid: null,
            foto_perfil: null,
            role: null,
            checkrole: null,
            birthday: null,
            carttoken: null,
            cart: null,
            total: 0,
            cartitem: 0,
            products: products,
            date: formatfecha
        }

        if (req.cookies.token) {
            const data = parseJwt(req.cookies.token);
            if (data.role === 'admin') cfg.checkrole = 'success';
            cfg.first_name = data.first_name;
            cfg.uid = data.id;
            cfg.foto_perfil = data.foto_perfil;
            cfg.role = data.role;
            if (cfg.role === 'admin') {
                cfg.checkrole = 1;
            };
            cfg.birthday = data.birthday;
        }

        if (req.cookies.tokenCart) {
            const cartok = parseJwt(req.cookies.tokenCart);
            cfg.carttoken = cartok;
            cfg.cart = await cartService.getCartByID(cartok.id);
            cfg.total = cfg.cart.total;
            cfg.cartitem = cfg.cart.products.reduce((sum, product) => sum + product.quantity, 0);
        }
        return cfg;
    }

}



export default viewsController;