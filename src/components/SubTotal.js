import React from 'react'
import CurrencyFormat from 'react-currency-format'
import './SubTotal.css'
import { useDataLayerValue } from '../DataLayer'
import { getBasketTotal } from '../reducer'
import { useHistory } from 'react-router-dom'

function SubTotal() {

    const [{ user, basket }] = useDataLayerValue();
    const history = useHistory();

    const proceedCheckout = () => {
        if(user) {
            history.push('/payment');
        } else {
            history.push('/login');
        }
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong> {value}</strong>                    
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order
                            contains gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            /> 
            <button onClick={proceedCheckout}>Proceed to Checkout</button>           
        </div>
    )
}

export default SubTotal
