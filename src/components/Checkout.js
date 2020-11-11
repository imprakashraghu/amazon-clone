import React from 'react'
import './Checkout.css'
import SubTotal from './SubTotal'
import CheckoutProduct from './CheckoutProduct'
import { useDataLayerValue } from '../DataLayer'

function Checkout() {

    const [{ user, basket }] = useDataLayerValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad" 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                    alt=""
                />
                <h3>Hello, {user?.email || "Guest"}</h3>
                <h2 className="checkout__title">
                    Your shopping Basket {!basket.length && 'is empty'}
                </h2>                             
                {
                    !basket.length && (
                        <p className="checkout__description">You have no items in your basket. To buy one or more items, click "Add to basket" next to the item.</p>
                    )
                }
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
            <div className="checkout__right">
                {
                    !!basket.length && (
                        <SubTotal />
                    )
                }
            </div>
        </div>
    )
}

export default Checkout
