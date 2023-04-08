
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import React, { useEffect, useState } from 'react'
import SlideProduct from '../components/SlideProduct';
import InfoProduct from '../components/InfoProduct';

function ProductDetail() {
    const [userID, setUserID] = useState("u_19841");
    const [product, setProduct] = useState();
    const { slug } = useParams();
    useEffect(function () {
        (async () => {
            let data = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/product/detail/${slug}`);
            let result = await data.json();
            console.log(result);
            setProduct(result);
        })();
    }, []);

    async function onHandleAddToCart(product) {
        console.log(product);
        // return;
        let res = await fetch(`${process.env.REACT_APP_DOMAIN_NAME}/api/cart/product`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'userID': userID
            },
            body: JSON.stringify({
                "userID": userID,
                "productCode": product.productCode,
                "name": product.name,
                "price": product.price,
                "size": product.size,
                "quantity": product.quantity,
                "color": product.color,
                "image": product.image
            })
        });

        let data = await res.json();
        console.log(data);
        if (data.status != 200) return;
    }


    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col xs={7}>
                        {
                            product ?
                                (<SlideProduct images={[...product.images]} />)
                                : ""
                        }
                    </Col>
                    <Col xs={5}>
                        {
                            product ?
                                (<InfoProduct {...product} onHandleAddToCart={onHandleAddToCart} />)
                                : ""
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductDetail