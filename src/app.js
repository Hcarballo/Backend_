import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils/utils.js';
import { productsSocket } from './public/js/productsSocket.js';
import { Server } from 'socket.io';
import { uploads } from './utils/multer.js';
import connectDB from './config/index.js';
import { messageModel } from './dao/models/messages.models.js';
import productManager from './dao/managers/productsManager.js';

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

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

connectDB();

app.use(productsSocket(io));

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('Error 500 en el server');
})

// app.use('/subir-file', uploads.single('thumbnail'), (req, res) => {

// })

io.on("connection", (socket) => {
    console.log("nuevo cliente conectado");

    socket.on("addProducts", (product) => {
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const thumbnail = product.thumbnail;
        const code = product.code;
        const stock = product.stock;

        uploads.single(product.thumbnail)

        try {
            const productmanager = new productManager();
            const result = productmanager.addProducts(
                title,
                description,
                price,
                thumbnail,
                code,
                stock
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

