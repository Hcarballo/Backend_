export default class CartRepository {
    constructor(cartDao){
        this.cartDao = cartDao;
    }

    getCarts = async () => await this.cartDao.getCarts();
    getCart = async filter => await this.cartDao.getCart(filter);
    createCart = async (newCart) => await this.cartDao.createCart(newCart);
    addProdToCart = async (cid, cart) => await this.cartDao.addProdToCart(cid, cart);
    deleteCart = async cid => await this.cartDao.deleteCart(cid);
}