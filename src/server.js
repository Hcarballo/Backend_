import express from 'express';
import { __dirname } from './utils/utils.js';
import handlebars from 'express-handlebars';
import { productsSocket } from './public/js/productsSocket.js';
import { Server as ServerIO } from 'socket.io';
import { Server as ServerHttp } from 'http';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { initializePassport } from './config/passport.config.js';
import { objectConfig } from './config/index.js';
import cors from 'cors';
import routerApp from './routes/index.js';
import { sendMessages } from '../src/utils/sendMessages.js';
import { addLogger } from './utils/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

const app = express();
const httpServer = new ServerHttp(app);
const io = new ServerIO(httpServer);
const { port } = objectConfig;

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de App E-wine',
            description: 'API para documentar app ecomerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors());
app.use(addLogger);

app.use(productsSocket(io));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(routerApp);

httpServer.listen(port, error => {
    if (error) console.log(error);
    console.log(`Server escuchando en el puerto ${port}`);
});

sendMessages(io);



