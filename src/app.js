import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
//UPLOADER MULTER
//PRODUCTOSOCKET
import { Server } from 'socket.io';


const PORT = 8080;

const app = express();
const httpServer = app.listen(PORT, error => {
    if (error) console.log(error);
    console.log(`Server escuchando en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).send('Error 500 en el server');
})

