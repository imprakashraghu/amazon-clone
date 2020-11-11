import React, { useState,useEffect } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { useDataLayerValue } from '../DataLayer'
import { auth } from '../firebase';

function Header() {

    const location = useLocation();
    const history = useHistory();

    const [{ user, basket }] = useDataLayerValue();
    const [searchText, setSearchText] = useState('');    

    const handleUser = () => {
        if(user) {
            auth.signOut();
        }
    }
   

    const handleSearch = (e) => {
        if(searchText) {
            if(e.keyCode === 13) {
                history.push({
                    pathname: '/search',
                    search: `?q=${searchText}`            
                });
            }             
        }
    }

    const goSearch = () => {
        if(searchText) {
            history.push({
                pathname: '/search',
                search: `?q=${searchText}`            
            });
        } else {
            alert('Input badly formatted!')
        }
    }

    const goHome = () => {
        setSearchText('');
        history.push('/');
    }

    const goPrime = () => {
        setSearchText('');
        history.push('/prime');
    }

    const goCheckout = () => {
        setSearchText('');
        history.push('/checkout');
    }
    
    return (
        <div className="header">
            <div onClick={goHome} style={{cursor: 'pointer'}}>
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </div>

            <div 
                className="header__search">                
                    <input        
                        onKeyDown={handleSearch}       
                        onChange={e => setSearchText(e.target.value)}      
                        value={location.search?.split('=')[1]||searchText}
                        className="header__searchInput"
                        type="text"
                    />
                    <SearchIcon
                        onClick={() => goSearch()}
                        className="header__searchIcon"
                    />                
            </div>

            <div 
                className="header__nav" 
            > 
            <Link to={!user && '/login'}>
                <div
                    onClick={handleUser}                     
                    className="header__option">                
                    <span
                        className="header__optionLineOne"                        
                    >Hello {
                        user ?
                        user?.email.split('@')[0]
                        : 'Guest'
                    }
                    </span>                                                                            
                    <span
                            className="header__optionLineTwo"                        
                        >{user ? 'Sign Out': 'Sign In'}                        
                    </span>                
                </div>
            </Link>
            <Link to="/orders">
                <div className="header__option">
                    <span
                        className="header__optionLineOne"                        
                    >Returns &amp;
                    </span>    
                    <span
                        className="header__optionLineTwo"                        
                    >Orders
                    </span>                    
                </div>
            </Link>
            <div onClick={goPrime} style={{cursor: 'pointer'}}>
                <div className="header__option">
                    <span
                        className="header__optionLineOne"                        
                    >Try 
                    </span>    
                    <span
                        className="header__optionLineTwo"                        
                    >Prime
                    </span>                    
                </div>
            </div>
            </div>

            <div onClick={goCheckout} style={{cursor: 'pointer'}}>
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo 
                    header__basketCount">{basket?.length}</span>
                </div>
            </div>

        </div>
    )
}

export default Header
