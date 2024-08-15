import supertest from "supertest";
import { expect } from "chai";

const expects = expect;

const requester = supertest('http://localhost:8080');

describe('Test de e-Wine', () => {
    describe('Test de Sessions', () => {
        it('El endpoint POST /api/session debe registrar un usuario', async ()=>{
            let cookie
            let user = {               
                first_name: "hernanR",
                last_name: "RamirezR",
                date: '10/10/1977',
                email: "PruebaTests4@gmail.com",
                password: "12345",
            }

            const{ statusCode, _body } = await requester.post('/api/sessions/register').send(user);
            expects(statusCode).to.be.equal(200);
        })

        it('El endpoint /api/session/login debe loggear un usuario y traer una cookie', async () => {
            let user = {
                email: "PruebaTests4@gmail.com",
                password: "12345",
            }
            const result = await requester.post('/api/sessions/login').send(user);
            const cookieResult = result.headers['set-cookie'][0];
            expects(cookieResult).to.be.ok
            const cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expects(cookie.name).to.be.ok.and.eql('token');
        })

        it('Este test debe poder eliminar la cookie', async () => {
            let user = {
                email: "PruebaTests4@gmail.com",
                password: "12345",
            };
            const result = await requester.post('/api/sessions/login').send(user);
            const cookieResult = result.headers['set-cookie'][0];            
            const cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            };

            const {                
                statusCode
            } = await requester.get(`/api/session/logout`);
            
            expects(statusCode).to.be.equal(200);
        })

    })
})