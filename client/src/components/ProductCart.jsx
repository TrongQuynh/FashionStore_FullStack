
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import style from "../assets/css/ProductCart.module.css";
import { Link } from 'react-router-dom';
import React from 'react'
import {formatToMoney} from "../helpers/index";

function ProductCart(product) {
    return (
        <Link to={`/product/detail/${product.slug}`} className={style.productLink}>
            <Card className={style.productCard} style={{maxWidth:"15rem",maxWidth:"470px"}}>
                <Card.Img variant="top" className={`w-100 ${style.imgCard}`} src={product.images[0]} />
                <Card.Body className={style.productCardBody}>
                    <Card.Title className='fs-6 text-dark'>{product.name}</Card.Title>
                    <Card.Text className={`text-dark ${style.productPrice}`}>
                        <b>{formatToMoney(product.price)}</b>
                    </Card.Text>
                    <Card.Text>
                        <Row>
                            
                            {
                                product.images.map(function(value, index){
                                    if(index > 5){
                                        return;
                                    }
                                    return (
                                        <Col xs={2} key={index}>
                                            <img style={{maxWidth:"21px",maxHeight:"28px"}} src={value} alt="" />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
       
    )
}

export default ProductCart