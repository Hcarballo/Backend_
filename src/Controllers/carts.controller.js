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
        console.log('Entre Mal')
        try {
            let user = null;
            if (req.cookies.token) {
                user = parseJwt(req.cookies.token);
            }
            const cart = {
                user: user.id,
                products: [],
                total: 0
            }
            const result = await this.cartService.createCart(cart);

            const tokenCart = generateToken({
                id: result.id
            })
            res.cookie('tokenCart', tokenCart, {
                maxAge: 60 * 60 * 1000 * 24
            })
            console.log('carro agregado');
            res.status(200).redirect('/home');
        } catch (error) {
            console.log(error);
        };
    };

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
    };

    addProductToCart = async (req, res) => {
        const cid = req.params.cid;
        console.log(`estos son ${cid}`)
        const { pid, quantity } = req.body;
        console.log(`estos son ${pid} y ${quantity}`)
        try {
            const cart = await this.cartService.getCartByID(cid);
            if (!cart) {
                return res.send('Carro Inexistente');
            }
            else {
                let product = await getProductsById(pid);
                const unitprice = product.precio;
                const subtotal = product.precio * quantity;
                cart.total = cart.total + product.precio * quantity;
                console.log(`Producto: ${pid} - Cantidad: ${quantity} - Precio Uni: ${unitprice} - Subtotal: ${subtotal} - Total: ${cart.total} - ID: ${cart._id}`)
                cart.products.push({ product: pid, quantity, unitprice, subtotal });

                const result = await cartService.addProdToCart(cid, cart);

                if (!result) res.send('Error operación');
                return res.status(200).redirect('/home');
            }

        } catch (error) {
            console.log(error);
        }
    };

    delProductToCart = async (req, res) => {
        console.log(`Entre a del prod ${req.params.cid} y ${req.body}`)
        const cid = req.params.cid;
        const pid = req.params.pid;
        try {
            const cart = await this.cartService.getCartByID(cid);
            if (!cart) return res.send('El carrito no existe');

            const productIndex = cart.products.findIndex(product => product.pid.toString() === pid);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }
            cart.total = cart.total - cart.products[productIndex].subtotal;
            cart.products.splice(productIndex, 1);

            if (!result) {
                return res.send('El producto no existe');
            }
            else {
                res.status(200).send({ status: 'success' });
                return res.send(result);
            }

        } catch (error) {
            console.log(error);
        }
    };

    deleteCart = async (req, res) => {
        try {
            const cid = req.params.cid;
            const result = this.cartService.deletecart(cid);
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
}

export default CartController;