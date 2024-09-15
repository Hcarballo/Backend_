import { defaultMaxListeners } from "connect-mongo";
import Stripe from "stripe";

class Paymentservice {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    createPaymentIntent = async data => {
        const paymentIntent = await this.stripe.paymentIntents.create(data);
        return paymentIntent;
    }

}

export default Paymentservice