import React from 'react'
import './Review.css'
import moment from 'moment'

function Review({ username, rating, message }) {
    return (
        <div className="review">
            <div className="review__heading">
                <img
                    className="review__headingImage"
                    src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                    alt=""
                />
                <h4
                    className="review__headingTitle"                    
                > {username}
                </h4>
            </div>
            <p className="review__rating">
                {'⭐'.repeat(rating)}
            </p>
            <p className="review__time">                
                Reviewed on {moment(new Date().toISOString()).format('DD MMMM YYYY')}
            </p>
            <p className="review__message"
            >{message}
            </p>
            <hr />
        </div>
    )
}

export default Review
