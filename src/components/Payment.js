import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useDataLayerValue } from '../DataLayer'
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../reducer'
import axios from './axios'
import { db } from '../firebase'

function Payment() {

    const [{user, basket}, dispatch] = useDataLayerValue();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);    

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // retrive new secret key from express app based on the basket total
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // STRIPE NEEDS TOTAL IN A CURRENCIES SUBUNITS
                url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100)}`
            });
            setClientSecret(response.data.clientSecret);
        }

        if(basket.length) getClientSecret();
    },[basket]);

    const handleSubmit = async (event) => {
        // stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
                        
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            // PAYMENT CONFIRMATION
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: "EMPTY_BASKET"
            });

            history.replace('/orders');
        }).catch(e => {
            setProcessing(false);
            alert('Something went wrong!');
            console.log(e);
        })
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout {
                        <Link to="/checkout">
                            {basket?.length} items
                        </Link>
                    }
                </h1>
                {/* Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email||'test@example.com'}</p>
                        <p>123 React Road</p>
                        <p>PY, India</p>
                    </div>
                </div>

                {/* Reviewing Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                    image={item.image}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Payment method  */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total : {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                /> 
                                <button disabled={processing || disabled || succeeded}
                                ><span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                                {/* ERROR */}
                                {error && <div>{error}</div>}
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
