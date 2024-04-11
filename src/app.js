import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT,error => {
    if(error) console.log(error);
    console.log(`Server escuchando en el puerto ${PORT}`);
})