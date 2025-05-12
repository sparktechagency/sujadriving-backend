/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import config from '../config';
import { Request, Response } from 'express';
import handlePaymentSuccess from './handlePaymentSuccess';
import handlePaymentFailed from './handlePaymentFailed';

const stripe = new Stripe(config.stripe.stripe_secret_key as string);
const handleWebhook = async (req: Request, res: Response) => {
    const endpointSecret = config.stripe.webhook_endpoint_secret;
    const sig = req.headers['stripe-signature'];

    try {
        // Verify the event
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig as string,
            endpointSecret as string
        );

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                console.log(session.metadata);
                const paymentIntentId = session.payment_intent;
                console.log(
                    `Payment Intent (Transaction) ID: ${paymentIntentId}`
                );

                const paymentIntent = await stripe.paymentIntents.retrieve(
                    paymentIntentId as string
                );
                console.log('payment intent', paymentIntent);

                console.log(`Checkout completed for session: ${session.id}`);
                await handlePaymentSuccess(
                    session.metadata,
                    paymentIntent.id,
                    paymentIntent.amount / 100
                );

                break;
            }
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log('Payment Intent succeeded', paymentIntent);

                console.log(
                    `Payment succeeded for Payment Intent ID: ${paymentIntent.id}`
                );
                console.log(`Amount: ${paymentIntent.amount / 100}`);

                await handlePaymentSuccess(
                    paymentIntent.metadata,
                    paymentIntent.id,
                    paymentIntent.amount / 100
                );
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const { userId } = paymentIntent.metadata;

                console.log(`Payment failed for user ${userId}`);
                await handlePaymentFailed(paymentIntent.metadata);
                // Notify the user about the failure
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.status(200).send('Success');
    } catch (err: any) {
        console.error('Webhook error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

export default handleWebhook;
