import React, { useContext } from "react";

import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import CartContext from "../../store/cart-context";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function PaymentForm({ backStep, shippingData, nextStep}) {
  const cartCtx = useContext(CartContext);

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        items: cartCtx.items,
        customer: { firstname: shippingData.firstname, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name:'Primary', street: shippingData.street,city:shippingData.city,zip_code:shippingData.zip},
        payment:{ gateway:'stripe',stripe: {payment_method_id: paymentMethod.id}}
      };
      nextStep()
    }
  };

  return (
    <>
      <Review />
      <Typography variant="h6" gutterBottom style={{ margin: "10px 0" }}>
        Payment methods
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement options={{ hidePostalCode: true }} />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {`$${cartCtx.totalAmount.toFixed(2)}`}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}

export default PaymentForm;
