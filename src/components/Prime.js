import React from 'react'
import './Prime.css'
import { Link } from 'react-router-dom'

function Prime() {
    return (
        <div className="prime">
            <div className="prime__container">
                <img
                    className="prime__image"
                    src="https://mainlymiles.com/wp-content/uploads/2018/08/amazon-prime-now.jpg"
                    alt=""
                />
                <Link to="/login">
                    <button>Join Prime Now</button>
                </Link>
            </div>            
        </div>
    )
}

export default Prime
