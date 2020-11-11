import React, { useState, useEffect } from 'react'
import './Orders.css'
import { useHistory } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer'
import { db } from '../firebase'
import Order from './Order'

function Orders() {

    const history = useHistory();
    const [{ user }] = useDataLayerValue();

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        
            if(user) {
                db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')         
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))     
                ))
            } else {
                history.push('/login');
            }

    },[user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders__order">
                {
                    orders?.map(order => (
                        <Order order={order} />
                    ))
                }
            </div>            
        </div>
    )
}

export default Orders
