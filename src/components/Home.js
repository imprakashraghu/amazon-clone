import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />
                <div className="home__row">
                    <Product
                        id="920122"
                        title="TCL Active Noise Cancelling Headphones, MTRO200NC Wireless Bluetooth Headphones On-Ear Lightweight Stereo Headphones"                     
                        price={79.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/61pRR8YhmYL._AC_SL1500_.jpg"                        
                    />  
                    <Product                
                        id="1234567"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"                     
                        price={589.99}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />                                                         
                </div>
                <div className="home__row">
                    <Product
                        id="48038203"
                        title="Simple Mobile Prepaid - Apple iPhone 7 (32GB) - Black"                         
                        price={199.99}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/61%2BfbdrjtCL._AC_SL1500_.jpg"                    
                    />
                    <Product
                        id="0987652"
                        title="Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal"                     
                        price={18.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/61IxWv3ecpL._AC_SL1000_.jpg"
                    />
                    <Product
                        id="90913012"
                        title="Think Like a Monk: Train Your Mind for Peace and Purpose Every Day Hardcover"                     
                        price={16.02}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/71ru1Xg+VyL.jpg"
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="193201932131"
                        title="Samsung IT LC27F591FDNXZA Samsung C27F591 27-Inch Curved Monitor"                     
                        price={958.74}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/91wXQisyRiL._AC_SL1500_.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
