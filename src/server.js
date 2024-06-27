import express from 'express';
import { __dirname } from './utils/utils.js';
import handlebars from 'express-handlebars';
import { Server as ServerIO } from 'socket.io';
import { Server as ServerHttp} from 'http';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { initializePassport } from './config/passport.config.js';
import { connectDB, objectConfig } from './config/index.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import {sendMessages} from '../src/utils/sendMessages.js';
import { productsSocket } from './public/js/productsSocket.js';
import routerApp from './routes/index.js';



const {port, mongo_url, private_key} = objectConfig
const app = express();
const httpServer = new ServerHttp(app);
const io = new ServerIO(httpServer);

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

// app.use(productsSocket(io));
// app.use(sendMessages(io));

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

//---Persistencia en DB Mongo ---------------------------
app.use(session({
    store: mongoStore.create({
        mongoUrl: mongo_url,
        ttl: 60 * 60 * 1000 * 24
    }),
    secret: private_key,
    resave: true,
    saveUninitialized: true
}));





