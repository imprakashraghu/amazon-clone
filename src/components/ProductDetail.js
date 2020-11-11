import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import PriceDetail from './PriceDetail'
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'
import Review from './Review'
import { useDataLayerValue } from '../DataLayer'

function ProductDetail(props) {        
    const location = useLocation().state?.state;
    const histtory = useHistory();

    const [{ reviews }, dispatch] = useDataLayerValue();

    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('');
    const [itemReviews, setItemReviews] = useState([]);

    useEffect(() => {
        if(!location) histtory.push('/');  
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        setItemReviews(reviews.filter(r => r.id === location?.id));
    },[reviews]);
  
    const addReview = (e) => {
        e.preventDefault();
        if(username && message) {

            dispatch({
                type: "ADD_REVIEW",
                review: {
                    id: location?.id,
                    username,
                    message,
                    rating
                }
            });

            setUsername('');
            setMessage('');
            setRating(0);

        } else {
            alert('Input Badly Formatted');
        }
    }

    return (
        <div className="productDetail">
            <img
                className="productDetail__adImage"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Jupiter2020/ILMs_Phase-4/Flat/Category_ILM_640x45_32._CB416322963_.jpg"
            />
            <div className="productDetail__container">
                <div className="productDetail__left">
                    <img
                        src={location?.image}
                        className="productDetail__image"
                    />
                </div>
                <div className="productDetail__right">
                    <h3
                        className="productDetail__leftTitle"
                    >{location?.title}
                    </h3>
                    <p className="productDetail__leftRating"
                    >{'⭐'.repeat(location?.rating)}
                    </p>
                    <p className="productDetail__leftPrice">
                        M.R.P.:
                        <small style={{color: '#B12704'}}> $</small>
                        <strong style={{color: '#B12704'}}>{location?.price}</strong>
                    </p>
                    <p className="productDetail__delivery">
                        Delivery by: <strong>{moment(new Date().toISOString()).format('dddd, MMM DD')}</strong>
                    </p>
                    <hr />
                    <p style={{color: 'green' ,paddingLeft: 10, marginTop: 7}}>
                        <strong>In Stock.</strong>
                    </p>
                    <p className="productDetail__leftDescription">
                        {location?.description}
                    </p>                    
                </div>                             
                <div className="productDetail__priceDetail">                    
                    <PriceDetail 
                        id={location?.id}                       
                        title={location?.title}
                        image={location?.image}
                        rating={location?.rating}
                        price={location?.price}                        
                    />                    
                    <img
                        className="productDetail__ad2"
                        src="https://images-na.ssl-images-amazon.com/images/G/31/shazam/M-series-Platter-244x250-p5VJB._V418916226_.jpg"
                    />
                </div>
            </div>
            <div className="productDetail__reviews">
                    <h3 className="productDetail__reviewsTitle">
                        Customer Reviews
                    </h3>
                    <p style={{marginBottom: 10, fontSize: 14, paddingLeft:5}}>Share your thoughts with other customers</p>
                    <div className="productDetail__reviewContainer">
                        <div className="productDetail__reviewForm">
                            <form>
                                <input type="text"
                                    autoFocus={false}
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    placeholder="Your name"
                                />
                                <input type="text"
                                    autoFocus={false}
                                    onChange={e => setMessage(e.target.value)}
                                    value={message}
                                    placeholder="Your review message"
                                />
                                <input type="number"
                                    autoFocus={false}
                                    onChange={e => setRating(e.target.value)}
                                    value={rating}
                                    max="5"
                                    placeholder="Your rating"
                                />  
                                <button onClick={addReview}>Write a Product Review</button>                          
                            </form>
                        </div>
                        <div className="productDetail__reviewInfo">                           
                            {
                                !!itemReviews.length && (
                                    itemReviews.map((review, index) => (
                                        <Review
                                            key={index}
                                            username={review.username}
                                            message={review.message}
                                            rating={review.rating}
                                        />
                                    ))
                                )
                            }                        
                            <Review 
                                username="Max Ikrane"
                                rating={4}
                                message="Product is super good. I repeat this is just a test review message for a dummy project build for my personal project stack."
                            /> 
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProductDetail
