import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51N5NonBbjyr5g6XBvyPXdgl3TbNdY3vrEzR7EGvGBWUOqtZzRPez3TVgyy3kGTM7Vw1LHMqrblLQE8um1XRTv70P00aJ9Emjyq'); // Your Stripe publishable key

const CheckoutForm = ({amount ,items }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [amount, setAmount] = useState(1000);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!stripe || !elements) return;

    try {
      // Create payment intent on backend
      const res = await fetch('http://localhost:5000/pay/createpaymentintent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret, error } = await res.json();

      if (error) {
        setMessage(error);
        return;
      }

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage('Payment failed: ' + result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded! ID: ' + result.paymentIntent.id);

        // Save payment info to backend
        // await fetch('http://localhost:5000/pay/savepayment', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     paymentId: result.paymentIntent.id,
        //     amount,
        //     currency: 'usd',
        //     status: result.paymentIntent.status,
        //   }),
        // });
await fetch('http://localhost:5000/pay/savepayment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    paymentId: result.paymentIntent.id,
    amount,
    currency: 'usd',
    status: result.paymentIntent.status,
    products: items, // ✅ Include cart items here
  }),
});



      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <label>
        Amount (in cents):&nbsp;
        <input
          type="number"
          value={amount}
          min="50"
          step="50"
          onChange={(e) => setAmount(parseInt(e.target.value))}
          required
        />
      </label>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: 4,
          marginTop: 10,
        }}
      >
        {/* <CardElement /> */}

<CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false, // 👈 This ensures the ZIP/postal code field is visible
  }}
/>


      </div>
      <button
        type="submit"
        disabled={!stripe}
        style={{ marginTop: 20, padding: '10px 20px' }}
      >
        Pay
      </button>
      {message && <div style={{ marginTop: 20 }}>{message}</div>}
    </form>
  );
};

const PaymentForm = ({amount , items} ) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm  amount={amount}  items={items} />
  </Elements>
);

export default PaymentForm;
