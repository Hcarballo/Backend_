import mongoose from "mongoose";
import {expect} from "chai";
import UsersDao from "../../src/daos/MONGO/userDao.js";

mongoose.connect('mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/')

const expects = expect;

describe('Set de test con Chai', () => {
    before(function () {
        this.userdao = new UsersDao();
    })

    beforeEach(function () {
        //mongoose.connection.collections.users.drop();
        this.timeout(5000);
    })

    it('El dao debe obtener todos los usuarios en formato arreglo', async function () {
        const result = await this.userdao.getUsers();
        expects(result).to.be.deep.equal([]);
    })
})
