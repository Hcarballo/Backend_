import { Router } from "express";

const router = Router();

router.get('/setCookie', (req, res) => {
    res.cookie('Hernan', 'Hola, probando cookie', { maxAge: 100000 }).send('cookie');
})

router.get('/getCookie', (req, res) => {
    //res.send(req.cookies);
    res.send(req.signedCookies);
})

router.get('/deleteCookie', (req, res) => {
    res.clearCookie('Hernan').send('cookie borrada');
})

router.get('/signedCookie', (req, res) => {
    res.cookie('Hernan', 'Hola, probando cookie', { maxAge: 100000, signed: true }).send('cookie firmada');
})

//-----------------------------

router.get('/session', (req,res)=>{
    if(req.session.counter){
req.session.counter++;
res.send(`Se visito la pag ${req.session.counter} veces`)

    }else{
        req.session.counter = 1;
        res.send('Bienvenido');
           }
})

router.get('/logout',(req,res) =>{
    req.session.destroy(err => {
        if(err) return res.send({status: 'error', error:err});
            else return res.send('logout');
    })
})

export default router;