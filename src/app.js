import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import pruebaCookie from './routes/cookie.router.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils/utils.js';
import { productsSocket } from './public/js/productsSocket.js';
import { Server } from 'socket.io';
import { uploads } from './utils/multer.js';
import { connectDB } from './config/index.js';
import { messageModel } from './dao/models/messages.models.js';
import productManager from './dao/managers/productsManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { sessionsRouter } from './routes/session.router.js';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';

const PORT = 8080;
const app = express();

const httpServer = app.listen(PORT, error => {
    if (error) console.log(error);
    console.log(`Server escuchando en el puerto ${PORT}`);
})

const io = new Server(httpServer);
let msgs = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//______________________________________________________________
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

//---Persistencia en DB Mongo ---------------------------
app.use(session({
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://hernancarballo:hc270777@e-wine.pnvzjwv.mongodb.net/EcomerceDB?retryWrites=true&w=majority&appName=E-Wine',
        ttl: 60 * 60 * 1000 * 24
    }),
    secret: 'firmasecreta',
    resave: true,
    saveUninitialized: true
}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

connectDB();

app.use(productsSocket(io));

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', userRouter);
app.use('/cookie', pruebaCookie);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('Error 500 en el server');
})


io.on("connection", (socket) => {
    console.log("nuevo cliente conectado");

    socket.on("addProducts", (product) => {
        const codigo = product.codigo;
        const nombre = product.nombre;
        const imagen = product.imagen;
        const uva = product.uva;
        const bodega = product.bodega;
        const precio = product.precio;
        const categoria = product.categoria;
        const stock = product.stock;


        uploads.single(product.thumbnail)

        try {
            const productmanager = new productManager();
            const result = productmanager.addProducts(
                codigo,
                nombre,
                imagen,
                uva,
                bodega,
                precio,
                categoria,
                stock,

            );
            let msj = 'Producto Agregado';
            io.emit("updateProduct", msj);

        } catch (error) {
            console.log(error);
        }
    });

    socket.on("deleteProduct", (id) => {
        try {
            const productmanager = new productManager();
            const result = productmanager.deleteProduct(id);
            let msj = "";
            if (result) {
                msj = "Producto eliminado";
            } else {
                msj = "Producto no encontrado";
            }
            io.emit("updateProduct", msj);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("message", async (data) => {
        let date = new Date();
        const { user, message } = data;
        let _msg = {
            user: user,
            msg: message,
            hour: String(`${date.getHours()}:${date.getMinutes()}`)
        }
        await messageModel.create(_msg);
        console.log('message:', data);

        msgs.push(data);

        io.emit('msgLog', msgs);
    })
});


