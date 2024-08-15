import Asserts from "assert";
import mongoose from "mongoose";
import CartsDao from "../../src/daos/MONGO/cartDao.js";


mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/')
const assert = Asserts.strict;

describe('Test users Dao', () => {
    before(function () {
        this.cartDao = new CartsDao();
    })

    beforeEach(function () {
        // mongoose.connection.collections.carts.drop();
        this.timeout(5000);
    })
    it('El test debe obtener los carritos en formato arreglo', async function () {        
        const result = await this.cartDao.getCarts();
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El test debe crear un carrito correctamente en la base de datos', async function () {
        let cart = {
            user: "66a0474ec60cc8518748b16a",
            products: [],            
        }

        const result = await this.cartDao.createCart(cart);
        assert.ok(result._id);
    })

    it('Debe encontrar un carrito pasando su id', async function(){
        let cart = {
            user: "66a0474ec60cc8518748b16a",
            products: [],            
        }

        const cartAdd = await this.cartDao.createCart(cart);
        
        const cid = cartAdd._id;
        const result = await this.cartDao.getCartByID(cid);
        assert.ok(result);
    })
})