import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Slide from '../components/Slide';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

import HomePageTab from '../components/HomePageTab';
import ProductCollection from '../components/ProductCollection';

function Home() {
    const [collection,setCollection] = useState([]);
    const [collection_2,setCollection_2] = useState([]);
    const [collection_3,setCollection_3] = useState([]);

    useEffect(function(){
        (async () => {
            let collections = ["ao-khoac","quan-tay","giay-dep"];
            let result = [];
            for(let collect of collections){
                let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/product/${collect}?limit=6`);
                let data = await res.json();
                result = [...result,...([{"collection":collect,"products": data.products}])];
            }
            setCollection(result);
        })();
        
    },[]);

    return (
        <div>
            <Header />
            <Slide />

            <div className="main mt-5">
                <Container>

                    {
                        collection.map(function(value,index){
                            return <ProductCollection {...value} key={index}/>;
                        })
                    }

                    
                </Container>
                <HomePageTab/>
            </div>

        </div>
    )
}

export default Home;