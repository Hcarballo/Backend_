import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.middlewares.js";
import { authorization } from "../utils/authorizationJwt.js";
import viewsController from "../Controllers/views.controller.js";

const {
    home,
    users,
    loaddocuments,
    products,
    realtimeproducts,
    restablecer,
    resetpassword,
    chat,
    detailProduct,
    login,
    register
} = new viewsController();

const router = Router();

router.get('/home', home )

router.get('/users', passportCall('jwt'), authorization('admin'), users)

router.get('/loaddocuments', loaddocuments)

router.get('/products', products)

router.post('/detailProduct/:pid', detailProduct)

router.get('/realTimeProducts', realtimeproducts)
 
router.get('/chat', chat)

router.get('/login', login)

router.get('/register', register)

router.get('/restablecer', restablecer)

router.get('/resetpassword', resetpassword)

//_____________Pruebas de Logger_______________
router.get('/logger_warning',(req,res)=>{
    req.logger.warning('Alerta!!');
    res.send('WARNING');
})

router.get('/logger_error',(req,res)=>{
    req.logger.error('Error!!');
    res.send('ERROR');
})

router.get('/logger_fatal',(req,res)=>{
    req.logger.fatal('Error Fatal');
    res.send('ERROR FATAL');
})

export default router;
