import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { productsSocket } from './public/js/productsSocket.js'
//UPLOADER MULTER
//PRODUCTOSOCKET
import { Server } from 'socket.io';
import productManager from './managers/productsManager.js';


const PORT = 8080;

const app = express();

const httpServer = app.listen(PORT, error => {
    if (error) console.log(error);
    console.log(`Server escuchando en el puerto ${PORT}`);
})

const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(productsSocket(io));

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('Error 500 en el server');
})


io.on("connection", (socket) => {
    console.log("nuevo cliente conectado");

    socket.on("addProduct", async (product) => {
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const thumbnail = product.thumbnail;
        const code = product.code;
        const stock = product.stock;

        try {
            const productmanager = new productManager();
            const result = await productmanager.addProducts(
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            );
            let msj = result;            
            io.emit("updateProduct", msj);

        } catch (error) {
            console.log(error);
        }
    });

    socket.on("deleteProduct", async (id) => {
        try {
            const productmanager = new productManager();
            const result = await productmanager.deleteProduct(parseInt(id));
            console.log(`mE DA ${result}`);
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
});

