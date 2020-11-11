import React from 'react'
import './Product.css'
import { useHistory } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer'

function Product({ id, title, image, price, rating }) {
    const history = useHistory();

    const [{ basket }, dispatch] = useDataLayerValue();

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
        <div className="product">
            <div className="product__info" onClick={() => openItem()}>
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    <p>{'⭐'.repeat(rating)}</p>
                </div>
            </div>
            <img 
                onClick={() => openItem()}
                src={image}
                alt=""
            />   
            <button onClick={addToBasket}>Add to basket</button>         
        </div>
    )
}

export default Product
