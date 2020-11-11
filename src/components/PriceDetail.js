import React from 'react'
import './PriceDetail.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import PinterestIcon from '@material-ui/icons/Pinterest'
import LockIcon from '@material-ui/icons/Lock'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { useDataLayerValue } from '../DataLayer'
import { useHistory } from 'react-router-dom'

function PriceDetail(props) { 
    const history = useHistory();
    const [{}, dispatch] = useDataLayerValue();
        
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: props
        });
    }

    const buyNow = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: props
        });
        history.push('/checkout');
    }

    return (
        <div className="pricedetail">
            <p className="pricedetails__share">
              <a href="#">
                  Share
              </a>  
              <MailOutlineIcon />
              <FacebookIcon className="pricedetails__facebook" />
              <TwitterIcon className="pricedetails__twitter" />
              <PinterestIcon className="pricedetails__pintrest" />
            </p>
            <button onClick={addToBasket}>
                Add to Cart                
            </button>
            <button onClick={buyNow}>
                Buy Now
            </button>
            <div className="pricedetail__gift">
                <input type="checkbox" />
                <p>Add gift options</p>
            </div>
            <a href="#"><LockIcon className="pricedetails__icon" /> Secure Transaction</a>            
            <a href="#"><LocationOnIcon className="pricedetails__icon" /> Select delivery location</a>
        </div>
    )
}

export default PriceDetail
