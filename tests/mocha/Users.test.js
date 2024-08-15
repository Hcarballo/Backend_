import Asserts from "assert";
import mongoose from "mongoose";
import UsersDao from "../../src/daos/MONGO/userDao.js";


mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/')
const assert = Asserts.strict;

describe('Test users Dao', () => {
    before(function () {
        this.userDao = new UsersDao();
    })

    beforeEach(function () {
        // mongoose.connection.collections.users.drop();
        this.timeout(5000);
    })
    it('El dao debe obtener los usuarios en formato arreglo', async function () {        
        const result = await this.userDao.getUsers();
        assert.strictEqual(Array.isArray(result), true)
    })
    it('Debe crear un usuario correctamente en la base de datos', async function () {
        let user = {
            fullname: "hernanC RamirezC",
            first_name: "hernanC",
            last_name: "RamirezC",
            age: 26,
            email: "PruebaTests2@gmail.com",
            password: "$2b$10$iawq.irpkf5OcMXIK1OBieHE6PF.L1LotnJ9cO2.tZa0qSOgr8gLq",
        }

        const result = await this.userDao.createUser(user);
        assert.ok(result._id);
    })
    it('Debe encontrar un usuario pasando su email', async function(){
        const result = await this.userDao.getUserByEmail("PruebaTests@gmail.com");
        assert.ok(result);
    })
})