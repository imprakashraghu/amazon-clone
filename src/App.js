import React, { useEffect } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { auth } from './firebase';
import { useDataLayerValue } from './DataLayer';
import ProductDetail from './components/ProductDetail';
import Prime from './components/Prime';
import Search from './components/Search';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';
import Footer from './components/Footer';

// PUBLIC KEY
const promise = loadStripe('pk_test_51HlEFvDPfCWaAczP7KnxZB389coG9RjEqThhDtYskEEAw84KctGINrAmI8TMSJMrjQJnuYrQuxA0s2VjmOeR46Hd00ou6eOhDi');

function App() {

  const [{}, dispatch] = useDataLayerValue();  

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log('LOGGED USER => ', authUser);

      if(authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser
        });

      } else {

        dispatch({
          type: "SET_USER",
          user: null
        });

      }

    })


  },[]);
    
  return (
    <Router>
      <div className="app">        
        <Switch>  
          <Route path="/login">            
            <Login />
          </Route>        
          <Route path="/prime">            
            <Header />
            <Prime />
          </Route>
          <Route path="/search">            
            <Header />
            <Search />
          </Route>
          <Route path="/payment">            
            <Header />
            <Elements stripe={promise}>
              <Payment />              
            </Elements>   
            <Footer />         
          </Route>
          <Route path="/orders">            
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">            
            <Header />
            <Checkout />            
          </Route>
          <Route path="/item">            
            <Header />
            <ProductDetail />
            <Footer />
          </Route>
          <Route path="/">             
            <Header />
            <Home />
            <Footer />
          </Route>          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
