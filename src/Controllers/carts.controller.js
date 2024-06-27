import ProductDao from "../daos/productDao.js"
import CartDao from "../daos/cartDao.js";

const {
    getCart,
    createCart,
    getCartByID,
    addprodtocart,
    delprodtocart,
    deletecart
} = new CartDao();

const {
    getProductsById
} = new ProductDao();

class CartController {
    constructor() { };

    getCart = async (req, res) => {
        try {
            const cartDB = await getCart();
            res.send(cartDB);
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async (req, res) => {
        try {
            const result = await createCart();
            console.log('carro agregado');
            res.status(200).send({ status: 'success', payload: result });
        } catch (error) {
            console.log(error);
        };
    };

    getCartByID = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = await getCartByID(cid);
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
        const { pid, quantity } = req.body;
        try {
            const cart = await getCartByID(cid);
            if (!cart) {
                return res.send('Carro Inexistente');
            }
            else {
                let product = await getProductsById(pid);
                const unitprice = product.price;
                const subtotal = product.price * quantity;
                cart.total = cart.total + product.price * quantity;
                cart.products.push({ product: pid, quantity, unitprice, subtotal });

                const result = await addprodtocart(cid, cart);

                if(!result) res.send('Error operación');
                res.status(200).send({ status: 'success' });
                return res.send(result);
            }

        } catch (error) {
            console.log(error);
        }
    };

    delProductToCart = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        try {
            const cart = await getCartByID(cid);
            if (!cart) return res.send('El carrito no existe');

            const productIndex = cart.products.findIndex(product => product.pid.toString() === pid);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }
            cart.total = cartDB.total - cartDB.products[productIndex].subtotal;
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
            const result = deletecart(cid);
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