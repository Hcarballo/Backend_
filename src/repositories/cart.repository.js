export default class CartRepository {
    constructor(cartDao) {
        this.cartDao = cartDao;
    }

    getCarts = async () => await this.cartDao.getCarts();
    getCartByID = async filter => await this.cartDao.getCartByID(filter);
    createCart = async (newCart) => await this.cartDao.createCart(newCart);
    addProdToCart = async (cid, cart) => await this.cartDao.addprodtocart(cid, cart);
    delprodtocart = async (cid, cart) => await this.cartDao.delprodtocart(cid, cart);
    updatecart = async (cid, cart) => await this.cartDao.updatecart(cid, cart);
    deleteCart = async (cid) => await this.cartDao.deletecart(cid);
}