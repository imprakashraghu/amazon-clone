import React from 'react'
import './CheckoutProduct.css'
import { useDataLayerValue } from '../DataLayer'
import { useHistory } from 'react-router-dom';

function CheckoutProduct({ hideButton, id, image, title, price, rating, type }) {

    const [{ basket }, dispatch] = useDataLayerValue();
    const history = useHistory();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
    }

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id,
                title,
                image,
                price,
                rating
            }
        });
    }

    const openItem = () => {
        history.push('/item', {
            state: { id, title, image, price, rating, description:"This is a test description of a test product. This is just a sample project for my personal stack." }
        })                 
    }

    return (
        <div className="checkoutProduct">
            <img
                onClick={() => openItem()}
                className="checkoutProduct__image"
                src={image}
                alt=""
            />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title" onClick={() => openItem()}>{title}</p>
                <p className="checkoutProduct__price" onClick={() => openItem()}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating" onClick={() => openItem()}>
                    {
                        '⭐'.repeat(rating)
                    }
                </div>
                {
                    !hideButton ?
                    type === 'search' ?
                    (
                        <button 
                            onClick={addToBasket} 
                            className="checkoutProduct__button"
                        >Add to basket</button>
                    ) :
                    (
                        <button 
                            onClick={removeFromBasket} 
                            className="checkoutProduct__button"
                        >Remove from basket</button>
                    ) : null
                }
            </div>
        </div>
    )
}

export default CheckoutProduct
