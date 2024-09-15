import { Router } from "express";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();


router.post('/payment-intents', async (req, res) => {
    try {
        const ticket = 0;
        if (!ticket) {
            return res.status(404).send({status: 'error', error: 'Ticket not found'});
        }

        const paymentIntentInfo = {
            amount: 0,
            currency: 'usd'
        }
const service = new PaymentService();
let result = await service.createPaymentIntent(paymentIntentInfo);

res.send({status: 'success', payload: result})

    } catch (error) {
        console.log(error);
    }
});
export default router;