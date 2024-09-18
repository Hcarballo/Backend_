import ProductDao from "../daos/MONGO/productDao.js"
import { cartService } from "../service/index.js";
import { generateToken, parseJwt } from "../utils/jwt.js";

const {
    getProductsById
} = new ProductDao();

class CartController {
    constructor() {
        this.cartService = cartService;
    };

    getCart = async (req, res) => {
        try {
            const cartDB = await this.cartService.getCarts();
            res.send(cartDB);
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async (req, res) => {
        try {
            if (!req.cookies.tokenCart) {
                let user = null;
                if (req.cookies.token) {
                    const founduser = parseJwt(req.cookies.token);
                    user = founduser.id;
                }
                const cart = {
                    user: user,
                    products: [],
                    total: 0,
                    status: "Pendiente"
                }
                const result = await this.cartService.createCart(cart);

                const tokenCart = generateToken({
                    id: result._id,
                });

                res.cookie('tokenCart', tokenCart, {
                    maxAge: 60 * 60 * 1000 * 24,
                })
            }
            res.status(200).json({ message: 'Carrito creado exitosamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el carrito' });
        }
    }

    getCartByID = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = await this.cartService.getCartByID(cid);
            if (!cart) {
                return res.send('Carro Inexistente');
            }
            else {
                return res.send(cart);
            }

        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (req, res) => {
        const cart = parseJwt(req.cookies.tokenCart);
        const { pid, quantity } = req.body;
        try {
            const cartfound = await this.cartService.getCartByID(cart.id);
            if (!cartfound)
                return res.status(404).json({ message: 'Carrito no encontrado' });
            else {
                let product = await getProductsById(pid);
                const image = product.imagen;
                const name = product.nombre;
                const unitprice = product.precio;
                const subtotal = product.precio * quantity;
                cartfound.total = cartfound.total + product.precio * quantity;

                cartfound.products.push({ product: pid, image, name, quantity, unitprice, subtotal });

                const result = await cartService.addProdToCart(cart.id, cartfound);

                if (!result) {
                    return res.send('Error operación');
                }
                return res.status(200).redirect('/cart');
            }

        } catch (error) {
            console.log(error);
        }
    };

    delProductToCart = async (req, res) => {
        const cart = parseJwt(req.cookies.tokenCart);
        const pid = req.params.pid;

        try {
            const cartfound = await this.cartService.getCartByID(cart.id);
            if (!cartfound) {
                return res.status(404).send('El carrito no existe');
            }

            const productIndex = cartfound.products.findIndex(product => product.product.toString() === pid);

            if (productIndex === -1) {
                return res.status(404).send('Producto no encontrado en el carrito');
            }

            cartfound.total -= cartfound.products[productIndex].subtotal;
            cartfound.products.splice(productIndex, 1);
            await this.cartService.delprodtocart(cart.id, cartfound);

            return res.status(200).send({ status: 'success' });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    };


    deleteCart = async (req, res) => {
        try {
            const cid = req.params.cid;
            const result = this.cartService.deleteCart(cid);
            if (!result) {
                res.send('Error');
            }
            else {
                res.status(200).send({ status: 'success', payload: result });
            }

        } catch (error) {
            console.log(error);
        }
    };

    deletecarts = async (req, res) => {
        const carts = await this.cartService.getCarts();
        if (carts.length <= 0) {
            return;
        }
        carts.forEach(async (cart) => {
            const usernull = cart.user;
            if (!usernull) {
                await this.cartService.deleteCart(cart._id);
            }
        });
    };

}

export default CartController;