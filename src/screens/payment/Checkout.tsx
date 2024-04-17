import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";




const Checkout: React.FC = () => {

    const MakePayment = async () => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY || "");
        if (stripe) {
            const customerName = 'Jaswant Singh';
            const customerEmail = 'jaswant.d4d@gmail.com';
            const customerAddress = {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            };

            const body = {
                products: null,
                baseurl: window.location.origin,
                customer: {
                    name: customerName,
                    address: customerAddress,
                    email: customerEmail,
                },

            }
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/payment/checkout-session`, body);

            // const result = stripe.redirectToCheckout({
            //     sessionId: response.data.sessionId
            // })

            const result = await stripe.confirmCardPayment(response.data.client_secret);

            // if (result.error) {
            //   console.error(result.error.message);
            // } else {
            //   console.log('Payment succeeded:', result.paymentIntent);
            // }
            console.log(result, "///////result")
        }
    }

    return (
        <>
            <section className="checkout-section">
                <div className="title">
                    <h1>Checkout</h1>
                </div>
                <button type="button" onClick={MakePayment}> Pay now</button>
            </section>
        </>
    )
}
export default Checkout