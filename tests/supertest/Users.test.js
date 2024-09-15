import supertest from "supertest";
import {expect} from "chai";

const expects = expect;

const requester = supertest('http://localhost:8080');

describe('Test de e-Wine', ()=>{
    describe('Test de Usuario', ()=>{
        it('El endpoint POST /api/users debe crear un usuario', async ()=>{
            let user = {               
                first_name: "hernanC",
                last_name: "RamirezC",
                date: '10-10-1977',
                email: "PruebaTests3@gmail.com",
                password: "12345",
            }

            const{
                statusCode,
                ok,
                _body
            } = await requester.post('/api/users').send(user);

            console.log(statusCode);
            console.log(ok);
            console.log(_body)
            expects(_body.payload).to.have.property('_id')
        })
        it('El endpoint GET /api/users debe traer los usuarios', async ()=>{
            const{
                statusCode,
                ok,
                _body
            } = await requester.get('/api/users');
                        
            expects(ok).to.be.equal(true);
            expects(statusCode).to.be.equal(200);
        })

        it('El endpoint GET /api/users/:uid debe traer el usuario', async ()=>{
            const uid = '66b2be1328c97941ecd5c8dd'
            const{
                statusCode,
                ok,
                _body
            } = await requester.get(`/api/users/${uid}`);            
           
            expects(ok).to.be.equal(true);
            expects(statusCode).to.be.equal(200);
        })
        
    })
    describe('Test de Usuario', ()=>{})
})