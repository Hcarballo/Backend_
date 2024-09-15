import { Router } from "express";
import productRouter from './api/product.router.js';
import cartRouter from './api/cart.router.js';
import userRouter from './api/users.router.js';
import emailRouter from './api/email.router.js';
import viewsRouter from '../routes/views.router.js';
import sessionsRouter from './api/session.router.js';
import { passportCall } from "../middlewares/passportCall.middlewares.js";
import { authorization } from "../utils/authorizationJwt.js";

const router = Router();

router.use('/', viewsRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/users', passportCall('jwt'), authorization('admin'), userRouter);

router.use('/api/email', emailRouter)

router.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('Error 500 en el server');
});

export default router;