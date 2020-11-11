import React, { useEffect, useState } from 'react'
import './Search.css'
import { useParams, useLocation } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer'
import CheckoutProduct from './CheckoutProduct'

function Search() {
    let location = useLocation();    

    const [{ products }] = useDataLayerValue();

    const [result, setResult] = useState([]);

    useEffect(() => {
        const searchQuery = location.search.split('=')[1] || '';
        const newResult = products.filter(p => (
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        setResult(newResult);
    },[]);

    return (
        <div className="search">
            {
                result.length ?
                (
                    result.map(item => (
                        <div className="search__result">
                            <CheckoutProduct
                                type="search"
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            />
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No Results Found</p>
                )                
            }
        </div>
    )
}

export default Search
