import { Router } from "express";
import { sendEmail } from "../../utils/sendEmail.js";

const router = Router();

router.get('/email', async (req, res) => {
    try {
        sendEmail({
            email: 'hernancarballo@hotmail.com',
            subject:'Email prueba',
            html: 'Bienvenido'
        });
        res.send('Email enviado a su casilla');
    } catch (error) {
        console.log(error);
    }
})

export default router;